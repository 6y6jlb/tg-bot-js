
import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";


const callbackHandler = async (bot:Bot ,msg: TelegramBotApi.CallbackQuery) => {
    const data = msg.data;
    const chatId = msg.message?.chat.id;
    const lastName = msg.from.last_name;
    const firstName = msg.from.first_name;
    console.log(msg)
    if (chatId) return bot.instance.sendMessage(chatId, bot.i18.t('callback.request'));

  };


  export default callbackHandler