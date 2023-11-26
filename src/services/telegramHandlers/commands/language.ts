import { i18n } from 'i18next';
import { APP_TYPE_ENUM } from "../../../models/const";
import { CALLBACK_COMMAND } from '../../../utils/const';
import { Callback } from '../../BotNotification/Callback';
import UserService from '../../User/UserService';
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function language(notification: Callback, i18: i18n) {

  const data = notification.getData();
  const chatId = notification.getChatId();

  const languageCode = data.split('?')[1];

  if (!languageCode) {
    await notification.send({
      text: i18.t("settings.params.language.title"), options: {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: i18.t('buttons.ru'), callback_data: `${CALLBACK_COMMAND.LANGUAGE_CHOICE}?ru` }],
            [{ text: i18.t('buttons.en'), callback_data: `${CALLBACK_COMMAND.LANGUAGE_CHOICE}?en` }],
          ]
        }
      }
    });
  } else {

    await UserService.update({ id: chatId, locale: languageCode });
    await UserSettingsService.updateOrCreate({ user_id: chatId, app_type: APP_TYPE_ENUM.SETTINGS, created_at: new Date(), payload: {} });
    i18.changeLanguage(languageCode);


    await notification.send({ text: i18.t("settings.update-succesfully") });
  }
}
