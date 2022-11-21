
import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/Bot";
import CONFIG from "../../utils/config";


const messageHandler = async (bot:Bot ,msg: TelegramBotApi.Message,) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const lastName = msg.from?.last_name;
    const firstName = msg.from?.first_name;
    const webAppData = msg.web_app_data?.data;
  
    if (msg.text === CONFIG.COMMANDS.START) {
      const answer = await bot.user.getOne(msg.from?.id);
      await bot.instance.sendMessage(chatId, answer.rows[0].name + ' - hello from db')

      await bot.instance.sendSticker(
        chatId,
        CONFIG.STICKERS.GREETING
      );
      return bot.instance.sendMessage(
        chatId,
        `${bot.i18.t("greeting")} - ${firstName}!`,
        {
          reply_markup: {
            keyboard: [
              [{ text: `${bot.i18.t('buttons.weather')}`, web_app: { url: CONFIG.PAGES.WEATHER } }],
              [{ text: `${bot.i18.t('buttons.event-reminder')}`, web_app: { url: CONFIG.PAGES.EVENT_REMINDER } }],
              [{ text: `${bot.i18.t('buttons.event-weather')}`, web_app: { url: CONFIG.PAGES.EVENT_WEATHER } }],
              [{ text: `${bot.i18.t('buttons.profile')}`, web_app: { url: CONFIG.PAGES.PROFILE } }]
            ]
          }
        }
      );
    } else if (webAppData) {
      try {
        const parsedData = JSON.parse(webAppData);
        return bot.instance.sendMessage(
          chatId,
          `${parsedData && parsedData.name} ${parsedData && parsedData.language} ${parsedData && parsedData.timezone}`
        );
  
      } catch (error) {
        console.log(error);
        return bot.instance.sendMessage(
          chatId,
          bot.i18.t('notifications.errors.something-went-wrong')
        );
      }
    } else if (text === 'keyboard') {
      await bot.instance.sendSticker(
        chatId,
        CONFIG.STICKERS.GREETING
      );
      return bot.instance.sendMessage(
        chatId,
        `${bot.i18.t("greeting")} - ${firstName}!`,
        {
          reply_markup: {
            keyboard: [
              [{ text: `${bot.i18.t('buttons.weather')}`, web_app: { url: CONFIG.PAGES.WEATHER } , request_location: true, }],
              [{ text: `${bot.i18.t('buttons.event-reminder')}`, web_app: { url: CONFIG.PAGES.EVENT_REMINDER } , request_location: true, }],
              [{ text: `${bot.i18.t('buttons.event-weather')}`, web_app: { url: CONFIG.PAGES.EVENT_WEATHER } , request_location: true, }],
              [{ text: `${bot.i18.t('buttons.profile')}`, web_app: { url: CONFIG.PAGES.PROFILE } , request_location: true, }]
            ]
          }
        }
      );
    } else if (text === 'inline') { //no main button event
      return bot.instance.sendMessage(
        chatId,
        `${bot.i18.t("greeting")} - ${firstName}!`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: `${bot.i18.t('buttons.weather')}`, web_app: { url: CONFIG.PAGES.WEATHER } }],
              [{ text: `${bot.i18.t('buttons.event-reminder')}`, web_app: { url: CONFIG.PAGES.EVENT_REMINDER } }],
              [{ text: `${bot.i18.t('buttons.event-weather')}`, web_app: { url: CONFIG.PAGES.EVENT_WEATHER } }],
              [{ text: `${bot.i18.t('buttons.profile')}`, web_app: { url: CONFIG.PAGES.PROFILE } }]
            ]
          }
        }
      );
    } else if (text === CONFIG.COMMANDS.INFO) {
      return bot.instance.sendMessage(
        chatId,
        `Тебя зовут ${firstName && firstName} ${lastName && lastName}`
      );
    } else {
      return bot.instance.sendMessage(
        chatId,
        bot.i18.t('notifications.errors.cant-understand')
      );
    }
  };


  export default messageHandler