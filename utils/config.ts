import dotenv from 'dotenv';

dotenv.config()

const TOKEN = process.env.TG_BOT_API_KEY || "===";
const ENV = process.env.NODE_ENV || "===";
const PORT = process.env.PORT || 8000;

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

export default {
  DESCRIPTIONS,
  COMMANDS,
  TOKEN,
  PORT,
  ENV,
};
