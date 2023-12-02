import { i18n } from "i18next";
import { TaskError } from "../../../exceptions/Task";
import { Callback } from "../../BotNotification/Callback";
import TaskService from '../../Task/TaskService';

export async function makeTaskRegular(notification: Callback, i18: i18n) {
  const data = notification.getData();

  if (!data) {
    throw new TaskError('Task can not be regular because data is empty')
  }

  const params = new URLSearchParams(data.split('?')[1]);
  const taskId = params.has('task_id') && params.get('task_id');
  if (taskId) {
    await TaskService.update({ _id: taskId, payload: { is_regular: true } });
    await notification.send({ text: `${i18.t('tasks.update.success')}` });
  } else {
    await notification.send({ text: `${i18.t('tasks.update.error')}` });
  }
}
