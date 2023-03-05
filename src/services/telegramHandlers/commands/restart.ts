import { i18n } from "i18next";
import { APP_TYPE_ENUM } from "../../../models/const";
import { Notification } from "../../Notification/Abstract";
import UserSettingsService from "../../UserSetttings/UserSettingsService";
import { getResetOptions } from "../template";


export async function restart(notification: Notification , i18: i18n) {
    const chatId = notification.getChatId();
    let message = '';
    try {
        UserSettingsService.updateOrCreate({ user_id: chatId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() , payload: {}});
        message = i18.t('actions.reset.description');
    } catch (error) {
        message = error.message;
    }

    await notification.send({ text: message, options: getResetOptions() });
}
