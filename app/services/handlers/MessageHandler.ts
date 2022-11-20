
import { i18n } from "i18next";
import TelegramBotApi from "node-telegram-bot-api";
import CONFIG from "../../utils/config";


const messageHandler = async (bot:TelegramBotApi ,msg: TelegramBotApi.Message, i18: i18n) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const lastName = msg.from?.last_name;
    const firstName = msg.from?.first_name;
    const webAppData = msg.web_app_data?.data;
  
    if (msg.text === CONFIG.COMMANDS.START) {
      await bot.sendSticker(
        chatId,
        CONFIG.STICKERS.GREETING
      );
      return bot.sendMessage(
        chatId,
        `${i18.t("greeting")} - ${firstName}!`,
        {
          reply_markup: {
            keyboard: [
              [{ text: `${i18.t('buttons.weather')}`, web_app: { url: CONFIG.PAGES.WEATHER } }],
              [{ text: `${i18.t('buttons.event-reminder')}`, web_app: { url: CONFIG.PAGES.EVENT_REMINDER } }],
              [{ text: `${i18.t('buttons.event-weather')}`, web_app: { url: CONFIG.PAGES.EVENT_WEATHER } }],
              [{ text: `${i18.t('buttons.profile')}`, web_app: { url: CONFIG.PAGES.PROFILE } }]
            ]
          }
        }
      );
    } else if (webAppData) {
      try {
        const parsedData = JSON.parse(webAppData);
        return bot.sendMessage(
          chatId,
          `${parsedData && parsedData.name} ${parsedData && parsedData.language} ${parsedData && parsedData.timezone}`
        );
  
      } catch (error) {
        console.log(error);
        return bot.sendMessage(
          chatId,
          i18.t('notifications.errors.something-went-wrong')
        );
      }
    } else if (text === 'keyboard') {
      await bot.sendSticker(
        chatId,
        CONFIG.STICKERS.GREETING
      );
      return bot.sendMessage(
        chatId,
        `${i18.t("greeting")} - ${firstName}!`,
        {
          reply_markup: {
            keyboard: [
              [{ text: `${i18.t('buttons.weather')}`, web_app: { url: CONFIG.PAGES.WEATHER } , request_location: true, }],
              [{ text: `${i18.t('buttons.event-reminder')}`, web_app: { url: CONFIG.PAGES.EVENT_REMINDER } , request_location: true, }],
              [{ text: `${i18.t('buttons.event-weather')}`, web_app: { url: CONFIG.PAGES.EVENT_WEATHER } , request_location: true, }],
              [{ text: `${i18.t('buttons.profile')}`, web_app: { url: CONFIG.PAGES.PROFILE } , request_location: true, }]
            ]
          }
        }
      );
    } else if (text === 'inline') { //no main button event
      return bot.sendMessage(
        chatId,
        `${i18.t("greeting")} - ${firstName}!`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: `${i18.t('buttons.weather')}`, web_app: { url: CONFIG.PAGES.WEATHER } }],
              [{ text: `${i18.t('buttons.event-reminder')}`, web_app: { url: CONFIG.PAGES.EVENT_REMINDER } }],
              [{ text: `${i18.t('buttons.event-weather')}`, web_app: { url: CONFIG.PAGES.EVENT_WEATHER } }],
              [{ text: `${i18.t('buttons.profile')}`, web_app: { url: CONFIG.PAGES.PROFILE } }]
            ]
          }
        }
      );
    } else if (text === CONFIG.COMMANDS.INFO) {
      return bot.sendMessage(
        chatId,
        `Тебя зовут ${firstName && firstName} ${lastName && lastName}`
      );
    } else {
      return bot.sendMessage(
        chatId,
        i18.t('notifications.errors.cant-understand')
      );
    }
  };


  export default messageHandler