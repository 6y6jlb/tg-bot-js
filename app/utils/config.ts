import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.TG_BOT_API_KEY || "===";
const ENV = process.env.NODE_ENV || "===";
const PORT = process.env.PORT || 8000;
const INDEX = '/index.html';
const DB_NAME = process.env.POSTGRESQL_ADDON_DB || '';
const DB_USER = process.env.POSTGRESQL_ADDON_USER || '';
const DB_PASS = process.env.POSTGRESQL_ADDON_PASSWORD || '';
const DB_HOST = process.env.POSTGRESQL_ADDON_HOST || '';
const DB_PORT = +process.env.POSTGRESQL_ADDON_PORT || 3000;
const DATABASE_URL = process.env.POSTGRESQL_ADDON_URI || '';

const COMMANDS = {
  START: "/start",
  INFO: "/info",
  RESTART: "/restart",
};

const DESCRIPTIONS = {
  [COMMANDS.START]: "hello",
  [COMMANDS.INFO]: "info",
  [COMMANDS.RESTART]: "restart",
};

const PAGES = {
  WEATHER: 'https://6y6jlb.github.io/tg-bot-frontend-v1/#/',
  EVENT_REMINDER: 'https://6y6jlb.github.io/tg-bot-frontend-v1/#/event-reminder',
  EVENT_WEATHER: 'https://6y6jlb.github.io/tg-bot-frontend-v1/#/event-weather',
  PROFILE: 'https://6y6jlb.github.io/tg-bot-frontend-v1/#/profile',
};

const STICKERS = {
  GREETING: "https://tlgrm.ru/_/stickers/401/755/4017559a-cf38-4208-ba63-faaf7908c8d3/2.webp"
};

const ADMINS = [
  process.env.ADMIN_ID
];

export default {
  DESCRIPTIONS,
  COMMANDS,
  STICKERS,
  TOKEN,
  ADMINS,
  PAGES,
  INDEX,
  PORT,
  ENV,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DATABASE_URL,
};
