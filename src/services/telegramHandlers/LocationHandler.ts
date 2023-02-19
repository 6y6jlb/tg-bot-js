
import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";


export const locationHandler = async (bot:Bot ,msg: TelegramBotApi.Message) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const lastName = msg.from?.last_name;
    const firstName = msg.from?.first_name;
    const webAppData = msg.web_app_data?.data;
    console.log('location')
  };