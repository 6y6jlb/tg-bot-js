import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.TG_BOT_API_KEY || "===";
const ENV = process.env.NODE_ENV || "===";
const PORT = process.env.PORT || 8000;
const INDEX = '/index.html';

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
  MAIN: 'https://monumental-travesseiro-6c016f.netlify.app/'
};

const STICKERS = {
  GREETING: "https://tlgrm.ru/_/stickers/401/755/4017559a-cf38-4208-ba63-faaf7908c8d3/2.webp"
};

export default {
  DESCRIPTIONS,
  COMMANDS,
  STICKERS,
  TOKEN,
  PAGES,
  INDEX,
  PORT,
  ENV,
};
