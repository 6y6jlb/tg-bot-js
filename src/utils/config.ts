import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.TG_BOT_API_KEY || "===";
const ENV = process.env.NODE_ENV || "===";
const PORT = process.env.PORT || 5000;
const INDEX = '/index.html';
const MONGO_DB_USER = process.env.MONGO_ATLAS_USER || '';
const MONGO_DB_PASS = process.env.MONGO_ATLAS_PASS || '';
const MONGO_DB_NAME = process.env.MONGO_ATLAS_NAME || '';

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
  MONGO_DB_USER,
  MONGO_DB_NAME,
  MONGO_DB_PASS,
};
