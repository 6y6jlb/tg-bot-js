import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { COMMANDS } from "../../utils/const";
import { deleteTask } from "./commands/deleteTask";
import { makeTaskRegular } from "./commands/makeTaskRegular";
import { restart } from "./commands/restart";
import { storeTask } from "./commands/storeTask";


const callbackHandler = async (bot: Bot, msg: TelegramBotApi.CallbackQuery) => {
  const data = msg.data;
  const chatId = msg.message?.chat.id;
  const userId = msg.from?.id;

  if (data === COMMANDS.RESTART) {
    restart(userId, bot, chatId);
  }

  else if (data === COMMANDS.TASKS_DELETE) {
    await deleteTask(userId, bot, chatId);
  }

  else if (data.includes(COMMANDS.TASKS_MAKE_REGULAR)) {
    await makeTaskRegular(data, bot, chatId);
  }

  else if (data.includes(COMMANDS.TASKS_STORE)) {
    await storeTask(data, userId, bot, chatId);
  }

  else {
    await bot.instance.sendMessage(chatId, bot.localeService.i18.t('actions.undefined.descriprion'));
  }



};


export default callbackHandler


