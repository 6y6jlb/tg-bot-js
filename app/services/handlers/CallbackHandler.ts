
import { i18n } from "i18next";
import TelegramBotApi from "node-telegram-bot-api";


const callbackHandler = async (bot:TelegramBotApi ,msg: TelegramBotApi.CallbackQuery, i18: i18n) => {
    const data = msg.data;
    const chatId = msg.message?.chat.id;
    const lastName = msg.from.last_name;
    const firstName = msg.from.first_name;
    console.dir(msg)
    if (chatId) return bot.sendMessage(chatId, i18.t('callback.request'));

  };


  export default callbackHandler