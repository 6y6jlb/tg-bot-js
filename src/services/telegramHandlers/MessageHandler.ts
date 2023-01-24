import moment from 'moment-timezone';
import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { taskCreationValidator } from '../../helpers/validation';
import { APP_TYPE_ENUM, IUser } from "../../models/types";
import { COMMANDS, PAGES, STICKERS } from "../../utils/const";
import RandomService from '../Random/RandomService';
import TaskService from "../Task/TaskService";
import UserService from "../User/UserService";
import UserSettingsService from "../UserSetttings/UserSettingsService";
import { TEMPERATURE_SIGN } from '../Weather/const';
import { EVENT_ENUM, ITask } from './../../models/types';
import { getResetOptions } from './template';



const messageHandler = async (bot: Bot, msg: TelegramBotApi.Message,) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  const language = msg.from?.language_code || 'en';
  const name = msg.from.username || msg.from.first_name;

  let message = '';
  let params = {};
  let imageUrl = '';

  const existedUser = userId ? await UserService.isUserExists(userId) : null;

  bot.localeService.changeLanguage(language);

  if (!existedUser) {

    await UserService.store({ id: String(userId), name, language })

    await bot.adminService.sendMesssageToAdmin(
      bot.instance, { text: bot.localeService.i18.t('notifications.common.new-user', { userId, userName: name }) }
    )

    await bot.instance.sendMessage(
      chatId,
      bot.localeService.i18.t("actions.greeting", { userName: name ?? bot.localeService.i18.t('guest') }),
      {
        reply_markup: {
          one_time_keyboard: true,
          inline_keyboard: [
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

    switch (text) {

      case COMMANDS.START:

        UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() })

        await bot.instance.sendSticker(chatId, STICKERS.GREETING);
        await bot.instance.sendMessage(
          chatId,
          bot.localeService.i18.t("actions.greeting", { userName: msg.from?.first_name ?? bot.localeService.i18.t('guest') }),
          {
            reply_markup: {
              one_time_keyboard: true,
              resize_keyboard: true,
              inline_keyboard: [
                [{ text: bot.localeService.i18.t('buttons.weather'), web_app: { url: PAGES.INDEX }, }],
                // [{ text: `${bot.localeService.i18.t('buttons.event-reminder')}`, web_app: { url: PAGES.EVENT_REMINDER }, }],
                // [{ text: `${bot.localeService.i18.t('buttons.event-weather')}`, web_app: { url: PAGES.EVENT_WEATHER }, }],
                // [{ text: `${bot.localeService.i18.t('buttons.profile')}`, web_app: { url: PAGES.PROFILE }, }]
              ]
            }
          }
        );
        break;

      case COMMANDS.TASKS:

        const isAdmin = bot.adminService.checkAdmin(userId)
        const tasks = await TaskService.get(isAdmin ? {} : { user_id: userId }) as ITask[];

        message = bot.localeService.i18.t('tasks.info-title');

        for (let task = 0; task < tasks.length; task++) {

          const currentTask = tasks[task];
          const callAt = moment.tz(TaskService.timeCorrection(currentTask.call_at), TaskService.FORMAT, 'UTC').tz(currentTask.tz).format(TaskService.FORMAT)

          message += `${bot.localeService.i18.t('tasks.info-line', { taskId: currentTask._id, userId: currentTask.user_id, event: EVENT_ENUM[currentTask.event_type], options: currentTask.options, date: callAt, regular_desctription: bot.localeService.i18.t(`tasks.reqular.${String(currentTask.is_regular)}`), escapeValue: false })}`;

        }

        await bot.instance.sendMessage(chatId, message, {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: bot.localeService.i18.t('buttons.tasks-new'), callback_data: COMMANDS.TASKS_STORE }],
              [{ text: bot.localeService.i18.t('buttons.tasks-delete'), callback_data: COMMANDS.TASKS_DELETE }],
            ]
          }
        });

        break;

      case COMMANDS.RESTART:

        try {

          UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() })
          message = bot.localeService.i18.t('actions.reset.description');
        } catch (error) {
          message = error.message;
          console.error(error)
        }

        await bot.instance.sendMessage(chatId, message, getResetOptions())
        break;

      case COMMANDS.INFO:

        try {
          const user = await UserService.get({ id: userId }) as IUser;

          const createdAt = moment(user.created_at,).tz(user.tz).format('HH:mma M.D.YYYY')

          message = bot.localeService.i18.t('actions.info', { name: user.name, userId: user.id, lang: user.language, tz: user.tz, createdAt })

        } catch (error) {
          message = error.message;
          console.error(error)
        }

        await bot.instance.sendMessage(chatId, message);
        break;

      case COMMANDS.WEATHER:

        try {
          UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.WEATHER_REQUEST, created_at: new Date() })
          message = bot.localeService.i18.t('weather.get-description');
        } catch (error) {
          message = error.message;
        }

        await bot.instance.sendMessage(
          chatId,
          message,
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: bot.localeService.i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
              ]
            }
          }
        );

        break;

        case COMMANDS.RANOM_IMAGE:

        try {

          imageUrl = await RandomService.getMessage();
          message = bot.localeService.i18.t('random.get-image');

        } catch (error) {
          
          message = error.message;

        }

      
        await bot.instance.sendMessage(chatId, message, getResetOptions())
        await bot.instance.sendPhoto(chatId,imageUrl);

        break;

      default:

        const userSettings = await UserSettingsService.get({ user_id: userId });

        if (userSettings) {

          switch (userSettings.app_type) {

            case APP_TYPE_ENUM.WEATHER_REQUEST:

              const weather = await bot.weatherService.get({ city: text, lang: bot.localeService.getLanguage() })
              await bot.instance.sendPhoto(
                chatId, weather.icon);
              await bot.instance.sendMessage(
                chatId,
                bot.localeService.i18.t('weather.tg-string', {
                  city: weather.name, temp: Math.ceil(Number(weather.main.temp)), feel: Math.ceil(Number(weather.main.feels_like)), humidity: weather.main.humidity, sign: TEMPERATURE_SIGN[weather.units], windSpeed: weather.wind.speed, description: weather.weather[0].description, pressure: weather.main.pressure, escapeValue: false
                }) + '\n' +
                bot.localeService.i18.t('weather.reset-with-description'),
                {
                  parse_mode: 'HTML',
                  reply_markup: {
                    inline_keyboard: [
                      [{ text: bot.localeService.i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                    ]
                  }
                });

              break;

            case APP_TYPE_ENUM.TASK_STORE_TYPE_WEATHER:
            case APP_TYPE_ENUM.TASK_STORE_TYPE_REMINDER:

              let params = {};
              try {
                await UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() })

                const { time, options, timezone } = taskCreationValidator(text)
                const eventType = userSettings.app_type === APP_TYPE_ENUM.TASK_STORE_TYPE_REMINDER ? EVENT_ENUM.REMINDER : EVENT_ENUM.WEATHER;
                const newTask = await TaskService.store({ call_at: time, is_regular: false, options, tz: timezone, user_id: msg.from?.id, event_type: eventType })

                message = bot.localeService.i18.t('tasks.store.success', { eventType: EVENT_ENUM[eventType].toLocaleLowerCase() })
                  + '\n' +
                  bot.localeService.i18.t('tasks.update.make-regular-description');

                params = {
                  parse_mode: 'HTML',
                  reply_markup: {
                    inline_keyboard: [
                      [{ text: bot.localeService.i18.t('buttons.yes'), callback_data: `${COMMANDS.TASKS_MAKE_REGULAR}?task_id=${newTask._id}` }],
                      // [{ text: bot.localeService.i18.t('buttons.no'), callback_data: COMMANDS.RESTART }],
                    ]
                  }
                };

              } catch (error) {
                message = bot.localeService.i18.t('tasks.store.error');
                params = {
                  parse_mode: 'HTML',
                }
              }

              await bot.instance.sendMessage(
                chatId,
                message,
                params,
              );
              break;

            case APP_TYPE_ENUM.TASK_DELETE:
              try {
                await TaskService.delete({ _id: text })
                await bot.instance.sendMessage(
                  chatId,
                  bot.localeService.i18.t('tasks.delete.success')
                  + '\n' +
                  bot.localeService.i18.t('tasks.reset-with-delete-task-description'),
                  {
                    parse_mode: 'HTML',
                    reply_markup: {
                      inline_keyboard: [
                        [{ text: bot.localeService.i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                      ]
                    }
                  }
                );
              } catch (error) {
                await bot.instance.sendMessage(
                  chatId,
                  bot.localeService.i18.t('tasks.delete.error'),
                  {
                    reply_markup: {
                      inline_keyboard: [
                        [{ text: bot.localeService.i18.t('buttons.reset-with-delete-task-description'), callback_data: COMMANDS.RESTART }],
                      ]
                    }
                  }
                );
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