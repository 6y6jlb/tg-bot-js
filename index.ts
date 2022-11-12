import express from "express";
import TelegramBotApi from "node-telegram-bot-api";
import CONFIG from "./utils/config";
import ru from "./i18n-js/json/en.json";
import en from "./i18n-js/json/en.json";
import cors from "cors";


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


const bot = new TelegramBotApi(CONFIG.TOKEN, { polling: true });

const macrosListener = async (msg: TelegramBotApi.Message) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const lastName = msg.from?.last_name;
  const firstName = msg.from?.first_name;

  if (text === 'keyboard') {
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
            [{ text: `${i18next.t('buttons.weather')}`, web_app: { url: CONFIG.PAGES.WEATHER }}],
            [{ text: `${i18next.t('buttons.event-reminder')}`, web_app: { url: CONFIG.PAGES.EVENT_REMINDER }}],
            [{ text: `${i18next.t('buttons.event-weather')}`, web_app: { url: CONFIG.PAGES.EVENT_WEATHER }}],
            [{ text: `${i18next.t('buttons.profile')}`, web_app: { url: CONFIG.PAGES.PROFILE }}]
          ]
        }
      }
    );
  } else if (text === 'inline') {
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
      `Я тебя не понимаю.. давай попробуем еще раз`
    );
  }
};

function start() {
  bot.on("message", async (msg) => {
    return macrosListener(msg);
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message?.chat.id;
    const lastName = msg.from.last_name;
    const firstName = msg.from.first_name;
    console.dir(msg)
    if (chatId) return bot.sendMessage(chatId, `Чего изволите?`);
  });
}

start();

