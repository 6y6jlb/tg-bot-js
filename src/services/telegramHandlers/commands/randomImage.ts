import { i18n } from "i18next";
import { Message } from "../../BotNotification/Message";
import RandomService from "../../Random/RandomService";
import { getResetOptions } from "../template";


export async function randomImage(notification: Message, i18: i18n) {
    let url = '';
    let message = '';
    try {

        url = await RandomService.getImage();
        message = i18.t('random.get-image');

    } catch (error: any) {
        message = error.message;

    }

    await notification.send({ text: message, options: getResetOptions() });
    await notification.send({ url });
}
