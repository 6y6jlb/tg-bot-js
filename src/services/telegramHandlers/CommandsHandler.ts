import { i18n } from 'i18next';
import { COMMANDS } from "../../utils/const";
import { Message } from "../BotNotification/Message";
import LocaleService from '../Locale/LocaleService';
import UserSettingsService from "../UserSetttings/UserSettingsService";
import AbstractHandler from './AbstractHandler';
import { exchange } from "./commands/exchange";
import { info } from "./commands/info";
import { randomImage } from "./commands/randomImage";
import { restart } from "./commands/restart";
import { settings } from './commands/setttings';
import { start } from "./commands/start";
import { tasks } from "./commands/tasks";
import { weather } from "./commands/weather";
import { webApp } from "./commands/webApp";
import { userSettingsHandler } from "./userSettingsHandler";

export class CommandHandler extends AbstractHandler {

    constructor(notification: Message, localeService: typeof LocaleService) {
        super(notification, localeService);
    }

    async handle() {
        const notification = this.notification as Message;
        const user = await notification.getUser();
        const text = notification.getText()
        const i18 = this.localeService.i18
        const chatId = this.notification.getChatId();

        switch (text) {

            case COMMANDS.START:
                await start(notification, i18);
                break;

            case COMMANDS.SETTINGS:
                await settings(notification, i18);
                break;

            case COMMANDS.TASKS:
                await tasks(notification, i18);
                break;

            case COMMANDS.RESTART:
                await restart(notification, i18);
                break;

            case COMMANDS.INFO:
                await info(notification, i18);
                break;

            case COMMANDS.EXCHANGE:
                await exchange(notification, i18);
                break;

            case COMMANDS.WEATHER:
                await weather(notification, i18);
                break;

            case COMMANDS.RANOM_IMAGE:
                await randomImage(notification, i18);
                break;

            case COMMANDS.WEB_APP:
                await webApp(notification, i18);
                break;

            default:
                const userSettings = await UserSettingsService.get({ user_id: user?._id });

                if (userSettings) {
                    await userSettingsHandler(userSettings, notification, i18);

                } else if (chatId) {
                    await notification.getNotificator().send(String(chatId), { text: i18.t('notifications.errors.cant-understand') });
                }
                break;
        }

    }
}
