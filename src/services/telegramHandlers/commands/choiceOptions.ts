import { i18n } from "i18next";
import { EVENT_ENUM } from "../../../models/const";
import { Callback } from "../../BotNotification/Callback";
import { COMMANDS } from './../../../utils/const';

export async function choiceOptions(notification: Callback, i18: i18n) {
  const chatId = String(notification.getChatId());
  const notificator = notification.getNotificator()
  const data = notification.getData();

  if (!data) {
    throw new Error('Task options can not be choised because data is empty')
  }

  const params = new URLSearchParams(data.split('?')[1]);

  const taskId = params.has('task_id') && params.get('task_id');
  if (taskId) {
    await notificator.send(chatId, {
      text: `${i18.t('tasks.update.options')}`, options: {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: i18.t('buttons.event-weather'), callback_data: `${COMMANDS.TASKS_SET_OPTIONS}?id=${taskId}&type=${EVENT_ENUM.WEATHER}` }],
            [{ text: i18.t('buttons.event-exchange'), callback_data: `${COMMANDS.TASKS_SET_OPTIONS}?id=${taskId}&type=${EVENT_ENUM.EXCHANGE}` }],
            [{ text: i18.t('buttons.event-reminder'), callback_data: `${COMMANDS.TASKS_SET_OPTIONS}?id=${taskId}&type=${EVENT_ENUM.REMINDER}` }],
            [{ text: i18.t('buttons.remove-option'), callback_data: `${COMMANDS.TASKS_REMOVE_OPTIONS}?id=${taskId}` }],
            [{ text: i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
          ]
        }
      }
    });
  } else {
    console.warn('Choice task option error: data - ' + data)
    await notificator.send(chatId, { text: `${i18.t('tasks.update.error')}` });
  }
}
