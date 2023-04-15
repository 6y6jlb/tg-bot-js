import { i18n } from "i18next";
import { COMMANDS } from "../../../utils/const";
import { Notification } from "../../BotNotification/Abstract";
import XChangeService from "../../XChange/XChangeService";

export async function currencies(notification: Notification, i18: i18n) {
    let message = i18.t('exchange.currencies');
    try {
        const currencies = await XChangeService.getCurrency();
        for (const [key, value] of Object.entries(currencies)) {
            message += `\n${key}: ${value}`

        }
    } catch (error) {
        message = error.message;
    }

    await notification.send({
        text: message, options: {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [{ text: i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                ]
            }
        }
    });
}
