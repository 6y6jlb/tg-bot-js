import { i18n } from 'i18next';
import TelegramBotApi from "node-telegram-bot-api";
import messageHandler from "../services/handlers/MessageHandler";
import config from "../utils/config";
import i18next, { TFunction } from 'i18next';
import ru from "../i18n-js/json/en.json";
import en from "../i18n-js/json/en.json";
import { HANDLER } from '../services/consts';
import locationHandler from '../services/handlers/LocationHandler';
import callbackHandler from '../services/handlers/CallbackHandler';

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

class Bot {
  instance: TelegramBotApi;
  i18: i18n


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
    this.instance.on("message", async (msg) => {
      messageHandler(this.instance, msg, this.i18);
    });

    this.instance.on("location", async (msg) => {
      locationHandler(this.instance, msg, this.i18)
    });

    this.instance.on("callback_query", async (msg) => {
      callbackHandler(this.instance, msg, this.i18)
    });
  }
}

export default Bot;