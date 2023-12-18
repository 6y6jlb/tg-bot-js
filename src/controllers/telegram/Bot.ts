import moment from "moment";
import TelegramBotApi from "node-telegram-bot-api";
import AdminService from "../../services/Admin/AdminService";
import { CronScheduler } from "../../services/Cron/CronScheduler";
import LocaleService from '../../services/Locale/LocaleService';
import TaskService from "../../services/Task/TaskService";
import { callbackHandler } from '../../services/telegramHandlers/CallbackHandler';
import { locationHandler } from '../../services/telegramHandlers/LocationHandler';
import { messageHandler } from "../../services/telegramHandlers/MessageHandler";
import config from "../../utils/config";



class Bot {

  instance: TelegramBotApi;
  localeService: typeof LocaleService;
  scheduler: CronScheduler;

  constructor() {
    this.localeService = LocaleService;
    this.instance = new TelegramBotApi(config.TG_TOKEN, { polling: true });
    this.scheduler = new CronScheduler(this.instance, this.localeService);
    //@ts-ignore
    global.tgBotInstance = this.instance
  }

  start() {
    this.scheduler.start();

    try {
      TaskService.resetQueue();
    } catch (error: any) {
      AdminService.sendMesssageToAdmin(
        this.instance, { text: error.message });
    }

    this.instance.on("message", async (msg) => {
      messageHandler(this, msg);
    });

    this.instance.on("location", async (msg) => {
      locationHandler(this, msg)
    });

    this.instance.on("callback_query", async (msg) => {
      callbackHandler(this, msg)
    });

    const now = moment().format('HH:mma MM.DD.YYYY');
    AdminService.sendMesssageToAdmin(
      this.instance, { text: this.localeService.i18.t('notifications.common.start', { date: now }) }
    )
    console.info(`Telegram bot started at ${now}`)
  }
}

export default Bot;