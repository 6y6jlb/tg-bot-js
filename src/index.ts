#!/usr/bin/env node
import cors from "cors";
import express from "express";
import CONFIG from "./utils/config";
import usersRouter from "./routers/users"
import tasksRouter from "./routers/tasks"
import weatherRouter from "./routers/weather"
import authRouter from "./routers/auth"
import exchangeRouter from "./routers/exchange"
import notificationRouter from "./routers/notification"
import mongoose from 'mongoose'
import Bot from "./controllers/telegram/Bot";


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





