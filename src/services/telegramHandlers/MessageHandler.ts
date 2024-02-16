import { USER_ID_ENUM } from "../../models/const";
import { IUser } from "../../models/types";
import AdminService from "../Admin/AdminService";
import { Message } from '../BotNotification/Message';
import LocaleService from "../Locale/LocaleService";
import UserService from "../User/UserService";
import AbstractHandler from "./AbstractHandler";
import { CommandHandler } from './CommandsHandler';

export class MessageHandler extends AbstractHandler {

  constructor(notification: Message, localeService: typeof LocaleService) {
    super(notification, localeService);
  }

  async handle() {
    const notification = this.getNotification() as Message;
    const localeService = this.getLocaleService();
    const name = notification.getName();
    const chatId = String(notification.getChatId());
    const notificator = notification.getNotificator();
    const msg = notification.getMsg();
    let user: IUser | undefined;

    try {
      user = await UserService.getById(chatId, USER_ID_ENUM.TELEGRAM_ID);
    } catch (error: any) {
      console.log(error.message)
    }

    const language = user?.locale || this.notification.getLanguage();
    localeService.changeLanguage(language);

    if (!user) {
      await UserService.store({ telegram_id: String(chatId), name: name || 'guest', locale: language })
      await AdminService.sendMesssageToAdmin(
        notification.getNotificator(), { text: this.localeService.i18.t('notifications.common.new-user', { userId: chatId, userName: name }) }
      )

      await notificator.send(chatId, { text: this.localeService.i18.t("actions.greeting", { userName: name ?? this.localeService.i18.t('guest') }) });

    } else if (msg.web_app_data) {
      try {

        const parsedData = JSON.parse(msg.web_app_data?.data);
        await notificator.send(chatId, { text: `${parsedData && parsedData.name} ${parsedData && parsedData.language} ${parsedData && parsedData.timezone}` });

      } catch (error) {
        console.warn(error)
        await notificator.send(chatId, ({ text: this.localeService.i18.t('notifications.errors.something-went-wrong') }));
      }

    } else {
      new CommandHandler(notification, localeService).handle()
    }
  }
}