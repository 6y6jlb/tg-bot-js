import { i18n } from "i18next";
import mongoose, { Schema } from 'mongoose';
import { TaskError } from "../../../exceptions/Task";
import { APP_TYPE_ENUM } from "../../../models/const";
import { ITask } from "../../../models/types";
import { COMMANDS } from '../../../utils/const';
import { Callback } from "../../BotNotification/Callback";
import TaskService from "../../Task/TaskService";
import UserSettingsService from "../../UserSetttings/UserSettingsService";
import { IUpdateTaskRequest } from "../../../requests/Task/types";

export async function removeOptionSelect(notification: Callback, i18: i18n) {
  const data = notification.getData();
  const user = await notification.getUser();

  if (!data) {
    throw new TaskError('Task options can not be removed because data is empty')
  }

  const params = new URLSearchParams(data.split('?')[1]);

  if (params.has('id') && params.has('index')) {
    //@ts-ignore
    const taskId = mongoose.Types.ObjectId(params.get('id') as string) as Schema.Types.ObjectId;
    const optionId = params.get('index');
    const task = await TaskService.get({ _id: taskId }) as ITask;
    const newOptions = task.options.filter((option, index) => index != Number(optionId))

    if (newOptions.length == 0) {
      await TaskService.delete({ _id: taskId })

    } else {
      const newTaskData: IUpdateTaskRequest = { options: newOptions, _id: taskId }

      await TaskService.update(newTaskData)

    }

    await UserSettingsService.updateOrCreate({ user_id: user._id, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date(), payload: { task_id: taskId } });

    await notification.send({
      text: i18.t('tasks.update.success'), options: {
        parse_mode: 'HTML'
      }
    });
  } else {
    console.warn('Removing subtask error: data - ' + data)
    await notification.send({ text: `${i18.t('tasks.update.error')}` });
  }
}


