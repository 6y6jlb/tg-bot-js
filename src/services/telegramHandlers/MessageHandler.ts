
import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { COMMANDS, PAGES, STICKERS } from "../../utils/const";
import UserService from "../User/UserService";


const messageHandler = async (bot: Bot, msg: TelegramBotApi.Message,) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  const existedUser = await UserService.isUserExists(msg.from?.id);
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
            [{ text: `${bot.localeService.i18.t('buttons.weather')}`, web_app: { url: PAGES.WEATHER }, }],
            [{ text: `${bot.localeService.i18.t('buttons.event-reminder')}`, web_app: { url: PAGES.EVENT_REMINDER }, }],
            [{ text: `${bot.localeService.i18.t('buttons.event-weather')}`, web_app: { url: PAGES.EVENT_WEATHER }, }],
            [{ text: `${bot.localeService.i18.t('buttons.profile')}`, web_app: { url: PAGES.PROFILE }, }]
          ]
        }
      }
    );

  }
  else if (msg.text === COMMANDS.START) {

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
            [{ text: `${bot.localeService.i18.t('buttons.weather')}`, web_app: { url: PAGES.WEATHER }, }],
            [{ text: `${bot.localeService.i18.t('buttons.event-reminder')}`, web_app: { url: PAGES.EVENT_REMINDER }, }],
            [{ text: `${bot.localeService.i18.t('buttons.event-weather')}`, web_app: { url: PAGES.EVENT_WEATHER }, }],
            [{ text: `${bot.localeService.i18.t('buttons.profile')}`, web_app: { url: PAGES.PROFILE }, }]
          ]
        }
      }
    );

    // await bot.instance.sendMessage(chatId,
    //   `${bot.localeService.i18.t("greeting")} - ${msg.from?.first_name}!`, {
    //   reply_markup: {
    //     inline_keyboard: [
    //         [{ text: `${bot.localeService.i18.t('buttons.weather')}`, web_app: { url: PAGES.WEATHER }, }],
    //         [{ text: `${bot.localeService.i18.t('buttons.event-reminder')}`, web_app: { url: PAGES.EVENT_REMINDER }, }],
    //         [{ text: `${bot.localeService.i18.t('buttons.event-weather')}`, web_app: { url: PAGES.EVENT_WEATHER }, }],
    //         [{ text: `${bot.localeService.i18.t('buttons.profile')}`, web_app: { url: PAGES.PROFILE }, }]
    //       ]
    //   }
    // })
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
    // } else if (text === 'inline') { //no main button event
    //   return bot.instance.sendMessage(
    //     chatId,
    //     `${bot.i18.t("greeting")} - ${firstName}!`,
    //     {
    //       reply_markup: {
    //         inline_keyboard: [
    //           [{ text: `${bot.i18.t('buttons.weather')}`, web_app: { url: CONFIG.PAGES.WEATHER } }],
    //           [{ text: `${bot.i18.t('buttons.event-reminder')}`, web_app: { url: CONFIG.PAGES.EVENT_REMINDER } }],
    //           [{ text: `${bot.i18.t('buttons.event-weather')}`, web_app: { url: CONFIG.PAGES.EVENT_WEATHER } }],
    //           [{ text: `${bot.i18.t('buttons.profile')}`, web_app: { url: CONFIG.PAGES.PROFILE } }]
    //         ]
    //       }
    //     }
    //   );
  } else if (text === COMMANDS.INFO) {
    await bot.instance.sendMessage(
      chatId,
      `${bot.localeService.i18.t('your-name-is')} - ${msg.from?.first_name} ${msg.from?.last_name}`
    );
  } else {
    await bot.instance.sendMessage(
      chatId,
      bot.localeService.i18.t('notifications.errors.cant-understand')
    );
  }
};


export default messageHandler