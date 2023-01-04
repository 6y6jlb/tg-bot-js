import { ITask, EVENT_ENUM } from './../../models/types';
import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { APP_TYPE_ENUM } from "../../models/types";
import { COMMANDS, PAGES, STICKERS } from "../../utils/const";
import TaskService from "../Task/TaskService";
import UserService from "../User/UserService";
import UserSettingsService from "../UserSetttings/UserSettingsService";
import { taskCreationValidator } from '../../helpers/validation';


const messageHandler = async (bot: Bot, msg: TelegramBotApi.Message,) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const userId = msg.from?.id;


  const existedUser = userId ? await UserService.isUserExists(userId) : null;
  if (!existedUser) {
    await UserService.store({ id: String(msg.from.id), name: msg.from.first_name, })
    await bot.adminService.sendMesssageToAdmin(
      bot.instance, { text: bot.localeService.i18.t('notifications.common.new-user', { userId: msg.from.id, userName: msg.from.first_name }) }
    )

    await bot.instance.sendMessage(
      chatId,
      `${bot.localeService.i18.t("action.greeting")} - ${msg.from?.first_name}!`,
      {
        reply_markup: {
          keyboard: [
            [{ text: `${bot.localeService.i18.t('buttons.weather')}`, web_app: { url: PAGES.INDEX }, }],
          ]
        }
      }
    );

  } else if (msg.web_app_data) {
    try {

      const parsedData = JSON.parse(msg.web_app_data?.data);
      await bot.instance.sendMessage(
        chatId,
        `${parsedData && parsedData.name} ${parsedData && parsedData.language} ${parsedData && parsedData.timezone}`
      );

    } catch (error) {
      console.log(error);
      await bot.instance.sendMessage(
        chatId,
        bot.localeService.i18.t('notifications.errors.something-went-wrong')
      );
    }
  } else {

    const userSettings = await UserSettingsService.get({ user_id: userId });

    switch (text) {
      case COMMANDS.START:
        UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() })
        await bot.instance.sendSticker(
          chatId,
          STICKERS.GREETING
        );
        await bot.instance.sendMessage(
          chatId,
          `${bot.localeService.i18.t("action.greeting", { userName: msg.from?.first_name ?? bot.localeService.i18.t('guest') })} - ${msg.from?.first_name}!`,
          {
            reply_markup: {
              keyboard: [
                [{ text: `${bot.localeService.i18.t('buttons.weather')}`, web_app: { url: PAGES.INDEX }, }],
                // [{ text: `${bot.localeService.i18.t('buttons.event-reminder')}`, web_app: { url: PAGES.EVENT_REMINDER }, }],
                // [{ text: `${bot.localeService.i18.t('buttons.event-weather')}`, web_app: { url: PAGES.EVENT_WEATHER }, }],
                // [{ text: `${bot.localeService.i18.t('buttons.profile')}`, web_app: { url: PAGES.PROFILE }, }]
              ]
            }
          }
        );
        break;

      case COMMANDS.TASKS:
        const tasks = await TaskService.get({}) as ITask[];
        let message = bot.localeService.i18.t('tasks.info-title');
        for (let task = 0; task < tasks.length; task++) {
          const currentTask = tasks[task];
          message += `${bot.localeService.i18.t('tasks.info-line', { userId: currentTask.user_id, event: EVENT_ENUM[currentTask.event_type], date: currentTask.call_at, escapeValue: false })}`;

        }
        await bot.instance.sendMessage(chatId, message, {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: `${bot.localeService.i18.t('buttons.tasks-new')}`, callback_data: COMMANDS.TASKS_STORE }],
            ]
          }
        });
        break;

      case COMMANDS.RESTART:
        UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() })
        await bot.instance.sendMessage(
          chatId,
          `${bot.localeService.i18.t('your-name-is')} - ${msg.from?.first_name} ${msg.from?.last_name}`
        );
        break;
      case COMMANDS.WEATHER:
        UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.WEATHER_REQUEST, created_at: new Date() })
        await bot.instance.sendMessage(
          chatId,
          `${bot.localeService.i18.t('weather.get-description')}`,
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: `${bot.localeService.i18.t('buttons.reset')}`, callback_data: COMMANDS.RESTART }],
              ]
            }
          }
        );
        break;

      default:
        if (userSettings) {
          switch (userSettings.app_type) {
            case APP_TYPE_ENUM.WEATHER_REQUEST:
              const weather = await bot.weatherService.get({ city: text })
              await bot.instance.sendMessage(
                chatId,
                bot.localeService.i18.t('weather.tg-string', {
                  city: weather.name, temp: String(weather.main.temp), feel: String(weather.main.feels_like), humidity: String(weather.main.humidity), escapeValue: false
                }),
                {
                  parse_mode: 'HTML',
                });
              break;

            case APP_TYPE_ENUM.TASK_STORE_TYPE_WEATHER:
            case APP_TYPE_ENUM.TASK_STORE_TYPE_REMINDER:
              UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() })
              const { time, options, timezone } = taskCreationValidator(text)
              const eventType = userSettings.app_type === APP_TYPE_ENUM.TASK_STORE_TYPE_REMINDER ? EVENT_ENUM.REMINDER : EVENT_ENUM.WEATHER;
              const newTask = TaskService.store({ call_at: time, is_regular: true, options, tz: timezone, user_id: msg.from?.id, event_type: eventType })
              if (newTask) {
                await bot.instance.sendMessage(
                  chatId,
                  bot.localeService.i18.t('tasks.store.success', { eventType: EVENT_ENUM[eventType].toLocaleLowerCase() }),
                  {
                    parse_mode: 'HTML',
                  });
              } else {
                await bot.instance.sendMessage(
                  chatId,
                  bot.localeService.i18.t('tasks.store.error'),
                  {
                    parse_mode: 'HTML',
                  });
              }
              break;

            default:
              break;
          }
        } else {
          await bot.instance.sendMessage(
            chatId,
            bot.localeService.i18.t('notifications.errors.cant-understand')
          );
        }
        break;
    }
  }
};


export default messageHandler;