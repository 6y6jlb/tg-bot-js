import TelegramBot from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { IUser } from "../../models/types";
import { COMMANDS } from "../../utils/const";
import UserSettingsService from "../UserSetttings/UserSettingsService";
import { exchange } from "./commands/exchange";
import { info } from "./commands/info";
import { randomImage } from "./commands/randomImage";
import { restart } from "./commands/restart";
import { start } from "./commands/start";
import { tasks } from "./commands/tasks";
import { weather } from "./commands/weather";
import { userSettingsHandler } from "./userSettingsHandler";

export const commadsHandler = async (bot: Bot, msg: TelegramBot.Message) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const userId = msg.from?.id;
    let user: IUser | null;

    switch (text) {

        case COMMANDS.START:

            await start(userId, bot, chatId, msg);
            break;

        case COMMANDS.TASKS:

            await tasks(bot, userId, chatId);
            break;

        case COMMANDS.RESTART:

            await restart(userId, bot, chatId);
            break;

        case COMMANDS.INFO:

            await info(user, userId, bot, chatId);
            break;

        case COMMANDS.EXCHANGE:
            await exchange(userId, bot, chatId);
            break;

        case COMMANDS.WEATHER:

            await weather(userId, bot, chatId);
            break;

        case COMMANDS.RANOM_IMAGE:

            await randomImage(bot, chatId);
            break;

        default:

            const userSettings = await UserSettingsService.get({ user_id: userId });

            if (userSettings) {
                await userSettingsHandler(userSettings, bot, msg);
                
            } else {
                await bot.instance.sendMessage(chatId, bot.localeService.i18.t('notifications.errors.cant-understand'));
            }
            break;
    }
}



