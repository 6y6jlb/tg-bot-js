import cors from "cors";
import express from "express";
import TelegramBotApi from "node-telegram-bot-api";
import { Pool } from "pg";
import CONFIG from "./app/utils/config";

process.on('uncaughtException', function (err) {
  console.warn(err);
});



const app = express()
  .use(cors())
  // .use('/auth', appRouter)
  .listen(CONFIG.PORT, () => console.log(`LISTENING ON PORT: ${CONFIG.PORT} WITH ${CONFIG.ENV} MODE.`));
;

import Bot from "./app/controllers/Bot";

const pool = new Pool({
  host: CONFIG.DB_HOST,
  user: CONFIG.DB_USER,
  database: CONFIG.DB_NAME,
  password: CONFIG.DB_PASS,
})

async function selectUsers() {
  try {
    const res = await pool.query(
      "select * from tasks"
    );
    console.log(res.rows)
  } catch (error) {
    console.error(error)
  }
}

selectUsers()

const bot = new Bot();

bot.start();
