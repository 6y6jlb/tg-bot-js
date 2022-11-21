import i18next, { i18n } from 'i18next';
import TelegramBotApi from "node-telegram-bot-api";
import { Pool } from 'pg';
import { default as en, default as ru } from "../i18n-js/json/en.json";
import callbackHandler from '../services/handlers/CallbackHandler';
import locationHandler from '../services/handlers/LocationHandler';
import messageHandler from "../services/handlers/MessageHandler";
import config from "../utils/config";
import User from "../models/user/User"


class Bot {
  instance: TelegramBotApi;
  user: User;
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

    const pool = new Pool({
      host: config.DB_HOST,
      user: config.DB_USER,
      database: config.DB_NAME,
      password: config.DB_PASS,
    });

    this.instance = new TelegramBotApi(config.TOKEN, { polling: true });
    this.i18 = i18next;
    this.user = new User(pool)
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