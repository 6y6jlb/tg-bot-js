import TelegramBotApi from "node-telegram-bot-api";
import LocaleService from '../../services/Locale/LocaleService';
import callbackHandler from '../../services/telegramHandlers/CallbackHandler';
import locationHandler from '../../services/telegramHandlers/LocationHandler';
import messageHandler from "../../services/telegramHandlers/MessageHandler";
import config from "../../utils/config";


class Bot {

  instance: TelegramBotApi;
  localeService: typeof LocaleService;
  
  constructor() {

    this.instance = new TelegramBotApi(config.TOKEN, { polling: true });
    this.localeService = LocaleService;
    
  }

  start() {
    this.instance.on("message", async (msg) => {
      messageHandler(this, msg);
    });

    this.instance.on("location", async (msg) => {
      locationHandler(this, msg)
    });

    this.instance.on("callback_query", async (msg) => {
      callbackHandler(this, msg)
    });
  }
}

export default Bot;