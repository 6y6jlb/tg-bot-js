import { i18n } from "i18next";
import { PAGES } from "../../../utils/const";
import { Message } from "../../BotNotification/Message";


export async function webApp(notification: Message, i18: i18n) {
  const chatId = String(notification.getChatId());
  const notificator = notification.getNotificator()

  await notificator.send(chatId, {
    text: i18.t("web_app.desctiption"), options: {
      reply_markup: {
        one_time_keyboard: true,
        inline_keyboard: [
          [{ text: `${i18.t('buttons.weather')}`, web_app: { url: PAGES.INDEX }, }],
        ]
      }
    }
  });
}
