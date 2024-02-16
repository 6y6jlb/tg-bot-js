import { i18n } from 'i18next';
import { APP_TYPE_ENUM } from "../../../models/const";
import { CALLBACK_COMMAND } from '../../../utils/const';
import { Callback } from '../../BotNotification/Callback';
import UserService from '../../User/UserService';
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function language(notification: Callback, i18: i18n) {
  const chatId = String(notification.getChatId());
  const notificator = notification.getNotificator()
  const data = notification.getData();

  if (!data) {
    throw new Error('Language can not be handled because data is empty')
  }

  const languageCode = data.split('?')[1];

  if (!languageCode) {
    await notificator.send(chatId, {
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
    const user = await notification.getUser();
    await UserService.update({ telegram_id: user.telegram_id as string, locale: languageCode });
    await UserSettingsService.updateOrCreate({ user_id: user._id, app_type: APP_TYPE_ENUM.SETTINGS, created_at: new Date(), payload: {} });
    i18.changeLanguage(languageCode);


    await notificator.send(chatId, { text: i18.t("settings.update-succesfully") });
  }
}
