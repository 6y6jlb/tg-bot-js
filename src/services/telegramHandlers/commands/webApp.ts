import { i18n } from "i18next";
import { PAGES } from "../../../utils/const";
import { Notification } from "../../Notification/Notification";


export async function webApp(notification: Notification, i18: i18n) {


  await notification.send({
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
