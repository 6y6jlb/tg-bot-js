import { i18n } from "i18next";
import moment from "moment-timezone";
import { Message } from "../../BotNotification/Message";


export async function info(notification: Message, i18: i18n) {
    const chatId = String(notification.getChatId());
    const notificator = notification.getNotificator()
    let message = '';
    try {
        const user = await notification.getUser();

        const createdAt = moment(user.created_at).tz(user.tz ? user.tz : 'UTC').format('HH:mma M.D.YYYY');

        message = i18.t('actions.info', { name: user.name, userId: user.telegram_id || user.email, lang: user.locale, tz: user.tz, createdAt });
    } catch (error: any) {
        message = error.message;
    }

    await notificator.send(chatId, {
        text: message, options: {
            parse_mode: 'HTML',
        }
    });
}
