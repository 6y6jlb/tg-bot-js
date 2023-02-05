import TelegramBot from "node-telegram-bot-api";
import Bot from "../../../controllers/telegram/Bot";
import { APP_TYPE_ENUM } from "../../../models/types";
import { STICKERS } from "../../../utils/const";
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function start(userId: number, bot: Bot, chatId: number, msg: TelegramBot.Message) {
    UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() });

    await bot.instance.sendSticker(chatId, STICKERS.GREETING);
    await bot.instance.sendMessage(chatId, bot.localeService.i18.t("actions.greeting", { userName: msg.from?.first_name ?? bot.localeService.i18.t('guest') }));
}
