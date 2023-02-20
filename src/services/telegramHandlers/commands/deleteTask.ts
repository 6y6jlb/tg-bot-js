import { i18n } from "i18next";
import { APP_TYPE_ENUM } from "../../../models/types";
import { Notification } from "../../Notification/Abstract";
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function deleteTask(notification: Notification, i18: i18n) {
  const chatId = notification.getChatId();
  UserSettingsService.updateOrCreate({ user_id: chatId, app_type: APP_TYPE_ENUM.TASK_DELETE, created_at: new Date() });
  await notification.send({ text: `${i18.t('actions.tasks.delete-description')}` });
}
