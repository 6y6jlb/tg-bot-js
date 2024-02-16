import TelegramBotApi from "node-telegram-bot-api";
import { CALLBACK_COMMAND, COMMANDS } from "../../utils/const";
import { NotificationFactory } from "../BotNotification/AbstractFactory";
import { Callback } from "../BotNotification/Callback";
import { TelegramNotificator } from "../BotNotification/TelegramNotificator";
import { TypeEnum } from "../BotNotification/consts";
import LocaleService from "../Locale/LocaleService";
import AbstractHandler from "./AbstractHandler";
import { choiceOptions } from "./commands/choiceOptions";
import { currencies } from "./commands/currencies";
import { deleteTask } from "./commands/deleteTask";
import { language } from './commands/language';
import { makeTaskRegular } from "./commands/makeTaskRegular";
import { removeOption } from "./commands/removeOption";
import { removeOptionSelect } from "./commands/removeOptionSelect";
import { restart } from "./commands/restart";
import { setOptions } from "./commands/setOptions";
import { storeTask } from "./commands/storeTask";
import { updateTask } from './commands/updateTask';


export class CallbackHandler extends AbstractHandler {
  constructor(notification: Callback, localeService: typeof LocaleService) {
    super(notification, localeService);
  }

  async handle() {

    const notification = this.getNotification() as Callback;
    const data = notification.getData();
    const i18 = this.getLocaleService().i18;

    if (!data) {
      throw new Error('Callback handler does not have data')
    }


    if (data === COMMANDS.RESTART) {
      await restart(notification, i18);
    }

    else if (data.includes(COMMANDS.TASKS_DELETE)) {
      await deleteTask(notification, i18);
    }

    else if (data === COMMANDS.CURRENCIES) {
      await currencies(notification, i18);
    }

    else if (data.includes(COMMANDS.TASKS_MAKE_REGULAR)) {
      await makeTaskRegular(notification, i18);
    }

    else if (data.includes(COMMANDS.TASKS_SELECT_OPTIONS)) {
      await choiceOptions(notification, i18);
    }

    else if (data.includes(COMMANDS.TASKS_SET_OPTIONS)) {
      await setOptions(notification, i18);
    }

    else if (data.includes(COMMANDS.TASKS_REMOVE_OPTIONS_SELECT)) {
      await removeOptionSelect(notification, i18);
    }

    else if (data.includes(COMMANDS.TASKS_REMOVE_OPTIONS)) {
      await removeOption(notification, i18);
    }

    else if (data.includes(COMMANDS.TASKS_STORE)) {
      await storeTask(notification, i18);
    }

    else if (data.includes(COMMANDS.TASKS_UPDATE)) {
      await updateTask(notification, i18);
    }

    else if (data.includes(CALLBACK_COMMAND.LANGUAGE_CHOICE)) {
      await language(notification, i18)
    }


    else {
      await notification.getNotificator().send(notification.getChatId(), { text: i18.t('actions.undefined.description') });
    }
  }
}
