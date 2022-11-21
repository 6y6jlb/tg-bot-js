import cors from "cors";
import express from "express";
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


const bot = new Bot();

bot.start();
