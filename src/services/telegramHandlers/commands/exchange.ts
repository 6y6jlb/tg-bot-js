import Bot from "../../../controllers/telegram/Bot";
import { APP_TYPE_ENUM } from "../../../models/types";
import { COMMANDS } from "../../../utils/const";
import UserSettingsService from "../../UserSetttings/UserSettingsService";

export async function exchange(userId: number, bot: Bot, chatId: number) {
    let message = '';
    try {
        await UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.EXCHANGE_START, created_at: new Date() });
        message = `${bot.localeService.i18.t('exchange.change')}\n${bot.localeService.i18.t('exchange.format-example')}`;
    } catch (error) {
        message = error.message;
    }

    await bot.instance.sendMessage(
        chatId,
        message,
        {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [{ text: bot.localeService.i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                ]
            }
        }
    );
    return message;
}
