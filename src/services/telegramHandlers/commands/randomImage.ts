import { i18n } from "i18next";
import { Message } from "../../BotNotification/Message";
import RandomService from "../../Random/RandomService";
import { getResetOptions } from "../template";


export async function randomImage(notification: Message, i18: i18n) {
    const chatId = String(notification.getChatId());
    const notificator = notification.getNotificator()
    let url = '';
    let message = '';
    try {

        url = await RandomService.getImage();
        message = i18.t('random.get-image');

    } catch (error: any) {
        message = error.message;

    }

    await notificator.send(chatId, { text: message, options: getResetOptions() });
    await notificator.send(chatId, { url });
}
