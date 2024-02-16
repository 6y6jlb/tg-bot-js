import { i18n } from "i18next";
import { COMMANDS } from "../../../utils/const";
import { AbstractNotification } from "../../BotNotification/AbstractNotification";
import XChangeService from "../../XChange/XChangeService";

export async function currencies(notification: AbstractNotification, i18: i18n) {
    const chatId = String(notification.getChatId());
    const notificator = notification.getNotificator()
    let message = i18.t('exchange.currencies');
    try {
        const currencies = await XChangeService.getCurrency();
        for (const [key, value] of Object.entries(currencies)) {
            message += `\n${key}: ${value}`

        }
    } catch (error: any) {
        message = error.message;
    }

    await notificator.send(chatId, {
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
