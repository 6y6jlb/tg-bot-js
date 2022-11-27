import TelegramBotApi from "node-telegram-bot-api";
import AdminService from "../../services/Admin/AdminService";
import LocaleService from '../../services/Locale/LocaleService';
import callbackHandler from '../../services/telegramHandlers/CallbackHandler';
import locationHandler from '../../services/telegramHandlers/LocationHandler';
import messageHandler from "../../services/telegramHandlers/MessageHandler";
import config from "../../utils/config";
import moment from "moment"

class Bot {

  instance: TelegramBotApi;
  localeService: typeof LocaleService;
  adminService: typeof AdminService;
  
  constructor() {

    this.instance = new TelegramBotApi(config.TOKEN, { polling: true });
    this.localeService = LocaleService;
    this.adminService = AdminService;
    
  }

  start() {

    this.instance.on("message", async (msg) => {
      messageHandler(this, msg);
    });

    this.instance.on("location", async (msg) => {
      locationHandler(this, msg)
    });

    this.instance.on("callback_query", async (msg) => {
      callbackHandler(this, msg)
    });

    this.adminService.sendMesssageToAdmin(
      this.instance, {text: this.localeService.i18.t('notifications.common.start',{date: moment().format('h:mma M/D/YYYY')})}
      )
  }
}

export default Bot;