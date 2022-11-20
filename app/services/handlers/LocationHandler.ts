
import { i18n } from "i18next";
import TelegramBotApi from "node-telegram-bot-api";
import CONFIG from "../../utils/config";


const locationHandler = async (bot:TelegramBotApi ,msg: TelegramBotApi.Message, i18: i18n) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const lastName = msg.from?.last_name;
    const firstName = msg.from?.first_name;
    const webAppData = msg.web_app_data?.data;
    console.log('location')
  };


  export default locationHandler