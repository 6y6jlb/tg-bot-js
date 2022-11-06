import express from "express";
import TelegramBotApi from "node-telegram-bot-api";
import CONFIG from "./utils/config";

const app = express();
import cors from "cors";

app.use(cors());

const bot = new TelegramBotApi(CONFIG.TOKEN, { polling: true });

const macrosListener = async (text, chatId, firstName, lastName) => {
  if (text === CONFIG.COMMANDS.START || text === CONFIG.COMMANDS.RESTART) {
    await bot.sendSticker(
      chatId,
      "https://tlgrm.ru/_/stickers/401/755/4017559a-cf38-4208-ba63-faaf7908c8d3/2.webp"
    );
    return bot.sendMessage(
      chatId,
      `Добро пожаловать ${firstName}!`
    );
  } else if (text === CONFIG.COMMANDS.INFO) {
    return bot.sendMessage(
      chatId,
      `Тебя зовут ${firstName && firstName} ${lastName && lastName}`
    );
  } else {
    return bot.sendMessage(
      chatId,
      `Я тебя не понимаю.. давай попробуем еще раз`
    );
  }
};

function startBot() {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const lastName = msg.from?.last_name;
    const firstName = msg.from?.first_name;
    return macrosListener(text, chatId, firstName, lastName);
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message?.chat.id;
    const lastName = msg.from.last_name;
    const firstName = msg.from.first_name;
    console.dir(msg)
    if (chatId) return bot.sendMessage(chatId, `Чего изволите?`);
  });
}

startBot();

app.get("/", (req, res) => {
  res.send("bot here");
});

app.listen(CONFIG.PORT, () => {
  console.log(`${CONFIG.ENV} app listening at http://localhost:${CONFIG.PORT}`);
});
