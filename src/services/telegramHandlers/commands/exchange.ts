import { i18n } from "i18next";
import { APP_TYPE_ENUM } from "../../../models/const";
import { COMMANDS } from "../../../utils/const";
import { Message } from "../../BotNotification/Message";
import UserSettingsService from "../../UserSetttings/UserSettingsService";

export async function exchange(notification: Message, i18: i18n) {
    const chatId = notification.getChatId();
    let message = '';
    try {
        await UserSettingsService.updateOrCreate({ user_id: chatId, app_type: APP_TYPE_ENUM.EXCHANGE_START, created_at: new Date() });
        message = `${i18.t('exchange.change')}\n${i18.t('exchange.format-example')}`;
    } catch (error) {
        message = error.message;
    }

    await notification.send({
        text: message, options: {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [{ text: i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                    [{ text: i18.t('buttons.currencies'), callback_data: COMMANDS.CURRENCIES }],
                ]
            }
        }
    });
}
