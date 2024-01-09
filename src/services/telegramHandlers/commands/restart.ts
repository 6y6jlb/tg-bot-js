import { i18n } from "i18next";
import { APP_TYPE_ENUM } from "../../../models/const";
import { Notification } from "../../BotNotification/Abstract";
import UserSettingsService from "../../UserSetttings/UserSettingsService";
import { getResetOptions } from "../template";


export async function restart(notification: Notification, i18: i18n) {
    let message = '';
    try {
        const user = await notification.getUser();
        UserSettingsService.updateOrCreate({ user_id: user._id, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date(), payload: {} });
        message = i18.t('actions.reset.description');
    } catch (error: any) {
        message = error.message;
    }

    await notification.send({ text: message, options: getResetOptions() });
}
