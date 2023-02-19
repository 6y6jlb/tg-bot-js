import { i18n } from "i18next";
import { Notification } from "../../Notification/Notification";
import RandomService from "../../Random/RandomService";
import { getResetOptions } from "../template";


export async function randomImage(notification: Notification, i18: i18n) {
    let url = '';
    let message = '';
    try {

        url = await RandomService.getImage();
        message = i18.t('random.get-image');

    } catch (error) {
        message = error.message;

    }

    await notification.send({ text: message, options: getResetOptions() });
    await notification.send({ url });
}
