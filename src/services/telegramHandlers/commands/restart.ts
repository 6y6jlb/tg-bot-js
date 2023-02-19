import { i18n } from "i18next";
import Bot from "../../../controllers/telegram/Bot";
import { APP_TYPE_ENUM } from "../../../models/types";
import { Notification } from "../../Notification/Notification";
import UserSettingsService from "../../UserSetttings/UserSettingsService";
import { getResetOptions } from "../template";


export async function restart(notification: Notification, i18: i18n) {
    const chatId = notification.getChatId();
    let message = '';
    try {
        UserSettingsService.updateOrCreate({ user_id: chatId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() });
        message = i18.t('actions.reset.description');
    } catch (error) {
        message = error.message;
    }

    await notification.send({ text: message, options: getResetOptions() });
}
