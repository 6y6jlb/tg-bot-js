import { i18n } from 'i18next';
import { APP_TYPE_ENUM } from "../../../models/const";
import { Message } from '../../BotNotification/Message';
import UserSettingsService from "../../UserSetttings/UserSettingsService";
import { CALLBACK_COMMAND } from './../../../utils/const';


export async function settings(notification: Message, i18: i18n) {
  const chatId = String(notification.getChatId());
  const notificator = notification.getNotificator()
  const user = await notification.getUser();

  if (!user) return;

  UserSettingsService.updateOrCreate({ user_id: user._id, app_type: APP_TYPE_ENUM.SETTINGS, created_at: new Date(), payload: {} });

  await notificator.send(chatId, {
    text: i18.t('settings.update-title'), options: {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: i18.t('buttons.language'), callback_data: CALLBACK_COMMAND.LANGUAGE_CHOICE }],
        ]
      }
    }
  });
}
