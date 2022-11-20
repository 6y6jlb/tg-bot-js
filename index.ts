import express from "express";
import TelegramBotApi from "node-telegram-bot-api";
import CONFIG from "./app/utils/config";
import ru from "./app/i18n-js/json/en.json";
import en from "./app/i18n-js/json/en.json";
import cors from "cors";
import {Pool} from "pg"

process.on('uncaughtException', function (err) {
  console.warn(err);
}); 



const app = express()
  .use(cors())
  // .use('/auth', appRouter)
  .listen(CONFIG.PORT, () => console.log(`LISTENING ON PORT: ${CONFIG.PORT} WITH ${CONFIG.ENV} MODE.`));
;

import i18next from 'i18next';

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
  host: CONFIG.DB_HOST,
  user: CONFIG.DB_USER,
  database: CONFIG.DB_NAME,
  password: CONFIG.DB_PASS,
})

async function selectUsers() {
  try {
    const res = await pool.query(
      "select * from users"
    );
    console.log(res.rows)
  } catch (error) {
    console.error(error)
  }
}

selectUsers()

const bot = new TelegramBotApi(CONFIG.TOKEN, { polling: true });

const macrosListener = async (msg: TelegramBotApi.Message) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const lastName = msg.from?.last_name;
  const firstName = msg.from?.first_name;
  const webAppData = msg.web_app_data?.data;
  console.log(msg.location)

  if (msg.text === CONFIG.COMMANDS.START) {
    await bot.sendSticker(
      chatId,
      CONFIG.STICKERS.GREETING
    );
    return bot.sendMessage(
      chatId,
      `${i18next.t("greeting")} - ${firstName}!`,
      {
        reply_markup: {
          keyboard: [
            [{ text: `${i18next.t('buttons.weather')}`, web_app: { url: CONFIG.PAGES.WEATHER } }],
            [{ text: `${i18next.t('buttons.event-reminder')}`, web_app: { url: CONFIG.PAGES.EVENT_REMINDER } }],
            [{ text: `${i18next.t('buttons.event-weather')}`, web_app: { url: CONFIG.PAGES.EVENT_WEATHER } }],
            [{ text: `${i18next.t('buttons.profile')}`, web_app: { url: CONFIG.PAGES.PROFILE } }]
          ]
        }
      }
    );
  } else if (webAppData) {
    try {
      const parsedData = JSON.parse(webAppData);
      return bot.sendMessage(
        chatId,
        `${parsedData && parsedData.name} ${parsedData && parsedData.language} ${parsedData && parsedData.timezone}`
      );

    } catch (error) {
      console.log(error);
      return bot.sendMessage(
        chatId,
        i18next.t('notifications.errors.something-went-wrong')
      );
    }
  } else if (text === 'keyboard') {
    await bot.sendSticker(
      chatId,
      CONFIG.STICKERS.GREETING
    );
    return bot.sendMessage(
      chatId,
      `${i18next.t("greeting")} - ${firstName}!`,
      {
        reply_markup: {
          keyboard: [
            [{ text: `${i18next.t('buttons.weather')}`, web_app: { url: CONFIG.PAGES.WEATHER } , request_location: true, }],
            [{ text: `${i18next.t('buttons.event-reminder')}`, web_app: { url: CONFIG.PAGES.EVENT_REMINDER } , request_location: true, }],
            [{ text: `${i18next.t('buttons.event-weather')}`, web_app: { url: CONFIG.PAGES.EVENT_WEATHER } , request_location: true, }],
            [{ text: `${i18next.t('buttons.profile')}`, web_app: { url: CONFIG.PAGES.PROFILE } , request_location: true, }]
          ]
        }
      }
    );
  } else if (text === 'inline') { //no main button event
    return bot.sendMessage(
      chatId,
      `${i18next.t("greeting")} - ${firstName}!`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: `${i18next.t('buttons.weather')}`, web_app: { url: CONFIG.PAGES.WEATHER } }],
            [{ text: `${i18next.t('buttons.event-reminder')}`, web_app: { url: CONFIG.PAGES.EVENT_REMINDER } }],
            [{ text: `${i18next.t('buttons.event-weather')}`, web_app: { url: CONFIG.PAGES.EVENT_WEATHER } }],
            [{ text: `${i18next.t('buttons.profile')}`, web_app: { url: CONFIG.PAGES.PROFILE } }]
          ]
        }
      }
    );
  } else if (text === CONFIG.COMMANDS.INFO) {
    return bot.sendMessage(
      chatId,
      `Тебя зовут ${firstName && firstName} ${lastName && lastName}`
    );
  } else {
    return bot.sendMessage(
      chatId,
      i18next.t('notifications.errors.cant-understand')
    );
  }
};

function start() {
  bot.on("message", async (msg) => {
    return macrosListener(msg);
  });

  bot.on("location", async (msg) => {
    console.log('location')
    console.dir(msg.location)
    // return macrosListener(msg);
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message?.chat.id;
    const lastName = msg.from.last_name;
    const firstName = msg.from.first_name;
    console.dir(msg)
    if (chatId) return bot.sendMessage(chatId, i18next.t('callback.request'));
  });
}

start();
