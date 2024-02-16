import { i18n } from "i18next";
import { APP_TYPE_ENUM } from "../../../models/const";
import { AbstractNotification } from "../../BotNotification/AbstractNotification";
import UserSettingsService from "../../UserSetttings/UserSettingsService";
import { getResetOptions } from "../template";


export async function restart(notification: AbstractNotification, i18: i18n) {
    const chatId = String(notification.getChatId());
    const notificator = notification.getNotificator()

    let message = '';
    try {
        const user = await notification.getUser();
        UserSettingsService.updateOrCreate({ user_id: user._id, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date(), payload: {} });
        message = i18.t('actions.reset.description');
    } catch (error: any) {
        message = error.message;
    }

    await notificator.send(chatId, { text: message, options: getResetOptions() });
}
