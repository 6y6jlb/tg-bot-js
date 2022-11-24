import cors from "cors";
import express from "express";
import CONFIG from "./app/utils/config";
import usersRouter from "./app/routers/users"
import mongoose from 'mongoose'
import Bot from "./app/controllers/telegram/Bot";

process.on('uncaughtException', function (err) {
  console.warn(err);
});

async function startApp() {
  try {

    await mongoose.connect(`mongodb+srv://${CONFIG.MONGO_DB_USER}:${CONFIG.MONGO_DB_PASS}@${CONFIG.MONGO_DB_NAME}.n2dmfie.mongodb.net/?retryWrites=true&w=majority`)

    const app = express()
      .use(cors())
      .use(express.json())
      .use('/api', usersRouter)
      .listen(CONFIG.PORT, () => console.log(`LISTENING ON PORT: ${CONFIG.PORT} WITH ${CONFIG.ENV} MODE.`));

    const bot = new Bot();
    bot.start();

  } catch (error) {
    console.log(error)
  }

}

startApp();





