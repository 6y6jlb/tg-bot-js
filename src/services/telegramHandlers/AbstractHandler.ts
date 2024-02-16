import { AbstractNotification } from "../BotNotification/AbstractNotification";
import LocaleService from "../Locale/LocaleService";


abstract class AbstractHandler {

  constructor(protected notification: AbstractNotification, protected localeService: typeof LocaleService) {
    this.notification = notification;
    this.localeService = localeService;
  }

  getNotification() {
    return this.notification;
  }

  getLocaleService() {
    return this.localeService;
  }
}

export default AbstractHandler;
