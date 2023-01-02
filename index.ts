#!/usr/bin/env node
import cors from "cors";
import express from "express";
import CONFIG from "./src/utils/config";
import usersRouter from "./src/routers/users"
import tasksRouter from "./src/routers/tasks"
import weatherRouter from "./src/routers/weather"
import mongoose from 'mongoose'
import Bot from "./src/controllers/telegram/Bot";
import https from "https"
import fs from "fs"



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
      .use('/api', tasksRouter)
      .use('/api', weatherRouter)
      .use(express.static(__dirname));

    //   https.createServer({
    //     key: fs.readFileSync('/etc/letsencrypt/live/lbas.website/privkey.pem'),
    //     cert: fs.readFileSync('/etc/letsencrypt/live/lbas.website/cert.pem'),
    // }, app)
    // .listen(CONFIG.PORT)
      

    const bot = new Bot();
    bot.start();

  } catch (error) {
    console.log(error)
  }

}

startApp();





