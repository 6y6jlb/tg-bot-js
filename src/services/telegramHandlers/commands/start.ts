import { i18n } from 'i18next';
import { APP_TYPE_ENUM } from "../../../models/const";
import { STICKERS } from "../../../utils/const";
import { Message } from '../../BotNotification/Message';
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function start(notification: Message, i18: i18n) {
    const user = await notification.getUser();
    const name = notification.getName()

    UserSettingsService.updateOrCreate({ user_id: user._id, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date(), payload: {} });

    await notification.send({ text: i18.t("actions.greeting", { userName: i18.t(name) }) });
    await notification.send({ sticker: STICKERS.GREETING });
}
