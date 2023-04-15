import { i18n } from "i18next";
import { APP_TYPE_ENUM, EVENT_ENUM, EVENT_OPTIONS } from "../../../models/const";
import { COMMANDS } from "../../../utils/const";
import { Callback } from "../../BotNotification/Callback";
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function storeTask(notification: Callback, i18: i18n) {
  const chatId = notification.getChatId();
  const data = notification.getData();

  const params = new URLSearchParams(data.split('?')[1]);
  const taskType = params.has('type') && params.get('type');
  const buttons = [];
  let message = '';

  if (taskType) {

    const appType = Object.keys(EVENT_OPTIONS).find(key => EVENT_OPTIONS[key] === taskType) as any;
    UserSettingsService.updateOrCreate({ user_id: chatId, app_type: appType, created_at: new Date() });

    message = i18.t(`tasks.description-${taskType.toLowerCase()}`) + '\n\n' + i18.t('tasks.description-timezone');

  } else {

    UserSettingsService.updateOrCreate({ user_id: chatId, app_type: APP_TYPE_ENUM.TASK_STORE_TYPE_DEFAULT, created_at: new Date() });

    message = i18.t('tasks.description-type');
    buttons.push([{ text: `${i18.t('buttons.tasks-type-weather')}`, callback_data: COMMANDS.TASKS_STORE + '?type=' + EVENT_ENUM[EVENT_ENUM.WEATHER] }]);
    buttons.push([{ text: `${i18.t('buttons.tasks-type-reminder')}`, callback_data: COMMANDS.TASKS_STORE + '?type=' + EVENT_ENUM[EVENT_ENUM.REMINDER] }]);
    buttons.push([{ text: `${i18.t('buttons.tasks-type-exchange')}`, callback_data: COMMANDS.TASKS_STORE + '?type=' + EVENT_ENUM[EVENT_ENUM.EXCHANGE] }]);

  }

  buttons.push([{ text: `${i18.t('buttons.reset')}`, callback_data: COMMANDS.RESTART }]);

  await notification.send({
    text: message, options: {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: buttons
      }
    }
  });
}

