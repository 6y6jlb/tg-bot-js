#!/usr/bin/env node
import cors from "cors";
import express from "express";
import CONFIG from "./src/utils/config";
import usersRouter from "./src/routers/users"
import tasksRouter from "./src/routers/tasks"
import weatherRouter from "./src/routers/weather"
import authRouter from "./src/routers/auth"
import exchangeRouter from "./src/routers/exchange"
import notificationRouter from "./src/routers/notification"
import mongoose from 'mongoose'
import Bot from "./src/controllers/telegram/Bot";


process.on('uncaughtException', function (err) {
  console.warn(err);
});

async function startApp() {
  try {
    await mongoose.set('strictQuery', true)
      .connect(`mongodb+srv://${CONFIG.MONGO_DB_USER}:${CONFIG.MONGO_DB_PASS}@${CONFIG.MONGO_DB_NAME}.n2dmfie.mongodb.net/?retryWrites=true&w=majority`)
    console.info(`Mongo connected`)


    express()
      .use(cors())
      .use(express.json())
      .use('/api', authRouter)
      .use('/api', usersRouter)
      .use('/api', tasksRouter)
      .use('/api', weatherRouter)
      .use('/api', notificationRouter)
      .use('/api', exchangeRouter)
      .use(express.static(__dirname))
      .listen(CONFIG.PORT);


    const bot = new Bot();
    bot.start();

  } catch (error) {
    console.log(error)
  }

}

startApp();





