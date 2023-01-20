import moment from "moment";
import TelegramBotApi from "node-telegram-bot-api";
import AdminService from "../../services/Admin/AdminService";
import { CronScheduler } from "../../services/Cron/CronScheduler";
import LocaleService from '../../services/Locale/LocaleService';
import callbackHandler from '../../services/telegramHandlers/CallbackHandler';
import locationHandler from '../../services/telegramHandlers/LocationHandler';
import messageHandler from "../../services/telegramHandlers/MessageHandler";
import WeatherService from "../../services/Weather/WeatherService";
import config from "../../utils/config";

class Bot {

  instance: TelegramBotApi;
  localeService: typeof LocaleService;
  adminService: typeof AdminService;
  weatherService: typeof WeatherService;
  scheduler: CronScheduler;

  constructor() {

    this.instance = new TelegramBotApi(config.TOKEN, { polling: true });
    this.localeService = LocaleService;
    this.adminService = AdminService;
    this.weatherService = WeatherService;
    this.scheduler = new CronScheduler(this.instance, this.localeService);
  }

  start() {
    this.scheduler.start()

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
    this.adminService.sendMesssageToAdmin(
      this.instance, { text: this.localeService.i18.t('notifications.common.start', { date: now }) }
    )
    console.info(`Telegram bot started at ${now}`)
  }
}

export default Bot;