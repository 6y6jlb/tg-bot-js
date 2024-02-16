import { i18n } from "i18next";
import mongoose, { Schema } from 'mongoose';
import { TaskError } from "../../../exceptions/Task";
import { APP_TYPE_ENUM } from "../../../models/const";
import { ITask } from "../../../models/types";
import { COMMANDS } from '../../../utils/const';
import { Callback } from "../../BotNotification/Callback";
import TaskService from "../../Task/TaskService";
import UserSettingsService from "../../UserSetttings/UserSettingsService";

export async function removeOption(notification: Callback, i18: i18n) {
  const chatId = String(notification.getChatId());
  const notificator = notification.getNotificator()
  const data = notification.getData();
  const user = await notification.getUser();

  if (!data) {
    throw new TaskError('Task options can not be removed because data is empty')
  }

  const params = new URLSearchParams(data.split('?')[1]);

  if (params.has('id')) {
    //@ts-ignore
    const taskId = mongoose.Types.ObjectId(params.get('id') as string) as Schema.Types.ObjectId;
    const task = await TaskService.get({ _id: taskId }) as ITask;

    await UserSettingsService.updateOrCreate({ user_id: user._id, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date(), payload: { task_id: taskId } });

    const buttons = [
      [{ text: i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
    ]


    task.options.forEach((option, index) => buttons.push([{ text: `DEL - ${option.event_type}: (${option.param})`, callback_data: `${COMMANDS.TASKS_REMOVE_OPTIONS_SELECT}?id=${taskId}&index=${index}` }]))

    await notificator.send(chatId, {
      text: i18.t('actions.tasks.remove-option-description'), options: {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: buttons

        }
      }
    });
  } else {
    console.warn('Removing subtask error: data - ' + data)
    await notificator.send(chatId, { text: `${i18.t('tasks.update.error')}` });
  }
}


