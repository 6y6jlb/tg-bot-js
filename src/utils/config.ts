import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.TG_BOT_API_KEY || "===";
const ENV = process.env.NODE_ENV || "===";
const PORT = process.env.PORT || 5000;
const TIMEZONE = process.env.TIMEZONE;


const MONGO_DB_USER = process.env.MONGO_ATLAS_USER || '';
const MONGO_DB_PASS = process.env.MONGO_ATLAS_PASS || '';
const MONGO_DB_NAME = process.env.MONGO_ATLAS_NAME || '';


const ADMINS = [
  process.env.ADMIN_ID
];


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const XCHANGE_API_KEY = process.env.XCHANGE_API_KEY;

const SMPT_RESPONSE_EMAIL = process.env.SMPT_RESPONSE_EMAIL;
const SMPT_PASSWORD = process.env.SMPT_PASSWORD;
const SMPT_LOGIN = process.env.SMPT_LOGIN;


export default {
  TOKEN,
  ADMINS,
  PORT,
  TIMEZONE,
  ENV,
  MONGO_DB_USER,
  MONGO_DB_NAME,
  MONGO_DB_PASS,
  WEATHER_API_KEY,
  XCHANGE_API_KEY,
  SMPT_RESPONSE_EMAIL,
  SMPT_PASSWORD,
  SMPT_LOGIN
};
