
import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { APP_TYPE_ENUM } from "../../models/types";
import { COMMANDS, PAGES, STICKERS } from "../../utils/const";
import UserService from "../User/UserService";
import UserSettingsService from "../UserSetttings/UserSettingsService";


const messageHandler = async (bot: Bot, msg: TelegramBotApi.Message,) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const userId = msg.from?.id;

  const existedUser = userId ? await UserService.isUserExists(userId) : null;
  console.log('existedUser', existedUser)
  if (!existedUser) {
    await UserService.store({ id: String(msg.from.id), name: msg.from.first_name, })
    await bot.adminService.sendMesssageToAdmin(
      bot.instance, { text: bot.localeService.i18.t('notifications.common.new-user', { userId: msg.from.id, userName: msg.from.first_name }) }
    )

    await bot.instance.sendMessage(
      chatId,
      `${bot.localeService.i18.t("greeting")} - ${msg.from?.first_name}!`,
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

    const userSettings = userId ? await UserSettingsService.get({ user_id: userId }) : null;
    if (!userSettings)

    switch (text) {
      case COMMANDS.START:
        UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() })
        await bot.instance.sendSticker(
          chatId,
          STICKERS.GREETING
        );
        await bot.instance.sendMessage(
          chatId,
          `${bot.localeService.i18.t("greeting")} - ${msg.from?.first_name}!`,
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

      case COMMANDS.RESTART:
        UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() })
        await bot.instance.sendMessage(
          chatId,
          `${bot.localeService.i18.t('your-name-is')} - ${msg.from?.first_name} ${msg.from?.last_name}`
        );
        break;
      case COMMANDS.WEATHER:
        UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.WEATHER, created_at: new Date()})
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
        await bot.instance.sendMessage(
          chatId,
          bot.localeService.i18.t('notifications.errors.cant-understand')
        );
        break;
    }
  }
};


export default messageHandler;
/* 

else if (userSettings) {
  console.log(userSettings)
  switch (bot.appType) {
    case 1:
      const weather = await bot.weatherService.get({ city: text })
      await bot.instance.sendMessage(
        chatId,
        `Город: ${weather.name}, Температура: ${String(weather.main.temp)}, Ощущается как: ${String(weather.main.feels_like)}, Влажность: ${String(weather.main.humidity)}`
      );
      break;

    default:
      await bot.instance.sendMessage(
        chatId,
        bot.localeService.i18.t('notifications.errors.cant-understand')
      );
      break;
  } 
  */