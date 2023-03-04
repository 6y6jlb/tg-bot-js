import { i18n } from "i18next";
import { APP_TYPE_ENUM, EVENT_ENUM } from "../../../models/types";
import { COMMANDS } from "../../../utils/const";
import { Callback } from "../../Notification/Callback";
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function storeTask(notification: Callback, i18: i18n) {
  const chatId = notification.getChatId();
  const data = notification.getData();
  if (data === COMMANDS.TASKS_STORE) {
    UserSettingsService.updateOrCreate({ user_id: chatId, app_type: APP_TYPE_ENUM.TASK_STORE_TYPE_DEFAULT, created_at: new Date() });
    await notification.send({
      text: `${i18.t('tasks.description-type')}`, options: {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: `${i18.t('buttons.tasks-type-weather')}`, callback_data: COMMANDS.TASKS_STORE + '?type=' + EVENT_ENUM[EVENT_ENUM.WEATHER] }],
            [{ text: `${i18.t('buttons.tasks-type-reminder')}`, callback_data: COMMANDS.TASKS_STORE + '?type=' + EVENT_ENUM[EVENT_ENUM.REMINDER] }],
          ]
        }
      }
    });
  }

  else if (data.includes('?type=' + EVENT_ENUM[EVENT_ENUM.WEATHER])) {
    UserSettingsService.updateOrCreate({ user_id: chatId, app_type: APP_TYPE_ENUM.TASK_STORE_TYPE_WEATHER, created_at: new Date() });
    await notification.send({
      text: `${i18.t('tasks.description-city')}`
    });
    await notification.send({
      text: `${i18.t('tasks.description-timezone')}`, options: {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: `${i18.t('buttons.reset')}`, callback_data: COMMANDS.RESTART }],
          ]
        }
      }
    });
  }

  else if (data.includes('?type=' + EVENT_ENUM[EVENT_ENUM.REMINDER])) {
    UserSettingsService.updateOrCreate({ user_id: chatId, app_type: APP_TYPE_ENUM.TASK_STORE_TYPE_REMINDER, created_at: new Date() });
    await notification.send({
      text: `${i18.t('tasks.description-option')}`
    });
    await notification.send({
      text: `${i18.t('tasks.description-timezone')}`, options: {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: `${i18.t('buttons.reset')}`, callback_data: COMMANDS.RESTART }],
          ]
        }
      }
    });
  }

  else {
    console.log('else', data);
  }
}
