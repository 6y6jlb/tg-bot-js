import Bot from "../../../controllers/telegram/Bot";
import { APP_TYPE_ENUM } from "../../../models/types";
import UserSettingsService from "../../UserSetttings/UserSettingsService";
import { getResetOptions } from "../template";


export async function restart(userId: number, bot: Bot, chatId: number) {
    let message = '';
    try {
        UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() });
        message = bot.localeService.i18.t('actions.reset.description');
    } catch (error) {
        message = error.message;
    }

    await bot.instance.sendMessage(chatId, message, getResetOptions());
    return message;
}
