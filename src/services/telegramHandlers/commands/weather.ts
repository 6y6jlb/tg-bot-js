import Bot from "../../../controllers/telegram/Bot";
import { APP_TYPE_ENUM } from "../../../models/types";
import { COMMANDS } from "../../../utils/const";
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function weather(userId: number, bot: Bot, chatId: number) {
    let message = '';
    try {
        UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.WEATHER_REQUEST, created_at: new Date() });
        message = bot.localeService.i18.t('weather.get-description');
    } catch (error) {
        message = error.message;
    }

    await bot.instance.sendMessage(
        chatId,
        message,
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: bot.localeService.i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                ]
            }
        }
    );
    return message;
}
