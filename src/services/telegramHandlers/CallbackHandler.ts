import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { COMMANDS } from "../../utils/const";
import { NotificationFactory } from "../Notification/AbstractFactory";
import { Callback } from "../Notification/Callback";
import { TypeEnum } from "../Notification/consts";
import { currencies } from "./commands/currencies";
import { deleteTask } from "./commands/deleteTask";
import { makeTaskRegular } from "./commands/makeTaskRegular";
import { restart } from "./commands/restart";
import { storeTask } from "./commands/storeTask";


export const callbackHandler = async (bot: Bot, msg: TelegramBotApi.CallbackQuery) => {
  const data = msg.data;

  const callback = new NotificationFactory(TypeEnum.CALLBACK, { bot: bot.instance, msg }).build() as Callback;


  if (data === COMMANDS.RESTART) {
    restart(callback, bot.localeService.i18);
  }

  else if (data === COMMANDS.TASKS_DELETE) {
    await deleteTask(callback, bot.localeService.i18);
  }

  else if (data === COMMANDS.CURRENCIES) {
    await currencies(callback, bot.localeService.i18);
  }

  else if (data.includes(COMMANDS.TASKS_MAKE_REGULAR)) {
    await makeTaskRegular(callback, bot.localeService.i18);
  }

  else if (data.includes(COMMANDS.TASKS_STORE)) {
    await storeTask(callback, bot.localeService.i18);
  }


  else {
    await callback.send({ text: bot.localeService.i18.t('actions.undefined.descriprion') });
  }

};

