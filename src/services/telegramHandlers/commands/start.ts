import { i18n } from 'i18next';
import { APP_TYPE_ENUM, USER_ID_ENUM } from "../../../models/const";
import { IUser } from '../../../models/types';
import { STICKERS } from "../../../utils/const";
import AdminService from '../../Admin/AdminService';
import { Message } from '../../BotNotification/Message';
import UserService from '../../User/UserService';
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function start(notification: Message, i18: i18n) {
    const chatId = String(notification.getChatId());
    const notificator = notification.getNotificator()
    const user: IUser | undefined = await notification.getUser();
    const name = notification.getName()
    const text = notification.getText()

    const userIdFromUrl = text.split(' ')[1]
    const userFromUrl = await UserService.getById(userIdFromUrl, USER_ID_ENUM.MONGO_ID);

    if (userFromUrl) {
        await UserService.update({ _id: userFromUrl._id, telegram_id: chatId })
    } else if (!user) {
        await UserService.store({ telegram_id: String(chatId), name: name || 'guest', locale: notification.getLanguage() })
        await AdminService.sendMesssageToAdmin(
            notification.getNotificator(), {
            textObject: {
                key: 'notifications.common.new-user', variables: { userId: chatId, userName: name }
            }
        }
        )
    }

    const userId = user?._id ?? userFromUrl?._id;

    if (userId) {
        UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date(), payload: {} });

    }

    await notificator.send(chatId, { text: i18.t("actions.greeting", { userName: i18.t(name) }) });
    await notificator.send(chatId, { sticker: STICKERS.GREETING });
}
