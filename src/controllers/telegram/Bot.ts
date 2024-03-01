import moment from "moment";
import TelegramBotApi from "node-telegram-bot-api";
import AdminService from "../../services/Admin/AdminService";
import { NotificationFactory } from "../../services/BotNotification/AbstractFactory";
import { TelegramNotificator } from "../../services/BotNotification/TelegramNotificator";
import { TypeEnum } from "../../services/BotNotification/consts";
import { CronScheduler } from "../../services/Cron/CronScheduler";
import LocaleService from '../../services/Locale/LocaleService';
import TaskService from "../../services/Task/TaskService";
import { CallbackHandler } from "../../services/telegramHandlers/CallbackHandler";
import { MessageHandler } from "../../services/telegramHandlers/MessageHandler";
import config from "../../utils/config";



class Bot {

  instance: TelegramBotApi;
  localeService: typeof LocaleService;
  scheduler: CronScheduler;
  notificator: TelegramNotificator;

  constructor() {
    this.localeService = LocaleService;
    this.instance = new TelegramBotApi(config.TG_TOKEN, { polling: true });
    this.notificator = new TelegramNotificator(this.instance)
    this.scheduler = new CronScheduler(this.notificator, this.localeService);
    //@ts-ignore
    global.tgBotInstance = this.instance
  }

  start() {
    this.scheduler.start();

    try {
      TaskService.resetQueue();
    } catch (error: any) {
      AdminService.sendMesssageToAdmin(
        this.notificator, { textObject: { text: error.message } });
    }

    this.instance.on("message", async (msg) => {
      new MessageHandler(
        new NotificationFactory(TypeEnum.MESSAGE, { notificator: this.notificator, msg }).build(),
        this.localeService
      ).handle();
    });

    this.instance.on("location", async (msg) => {
      // TODO
      console.log('Location handler', msg)

    });

    this.instance.on("callback_query", async (msg) => {
      new CallbackHandler(
        new NotificationFactory(TypeEnum.CALLBACK, { notificator: this.notificator, msg }).build(),
        this.localeService
      ).handle();
    });

    const now = moment().format('HH:mma MM.DD.YYYY');
    AdminService.sendMesssageToAdmin(
      this.notificator, { textObject: { key: 'notifications.common.start', variables: { date: now } } }
    )
    console.info(`Telegram bot started at ${now}`)
  }
}

export default Bot;