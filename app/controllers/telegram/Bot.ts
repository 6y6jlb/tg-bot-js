import i18next, { i18n } from 'i18next';
import TelegramBotApi from "node-telegram-bot-api";
import { default as en, default as ru } from "../../i18n-js/json/en.json";
import callbackHandler from '../../services/telegramHandlers/CallbackHandler';
import locationHandler from '../../services/telegramHandlers/LocationHandler';
import messageHandler from "../../services/telegramHandlers/MessageHandler";
import config from "../../utils/config";


class Bot {
  instance: TelegramBotApi;
  i18: i18n;


  constructor() {

    i18next.init({
      lng: 'en',
      debug: true,
      resources: {
        en: {
          translation: en
        },
        ru: {
          translation: ru
        },
      }
    });

    this.instance = new TelegramBotApi(config.TOKEN, { polling: true });
    this.i18 = i18next;
  }

  start() {
    // this.instance.on("message", async (msg) => {
    //   messageHandler(this, msg);
    // });

    // this.instance.on("location", async (msg) => {
    //   locationHandler(this, msg)
    // });

    // this.instance.on("callback_query", async (msg) => {
    //   callbackHandler(this, msg)
    // });
  }
}

export default Bot;