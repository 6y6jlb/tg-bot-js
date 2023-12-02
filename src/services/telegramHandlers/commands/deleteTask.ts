import { i18n } from "i18next";
import { ITask } from "../../../models/types";
import { COMMANDS } from "../../../utils/const";
import AdminService from "../../Admin/AdminService";
import { Callback } from "../../BotNotification/Callback";
import TaskService from "../../Task/TaskService";
import { TaskError } from "../../../exceptions/Task";


export async function deleteTask(notification: Callback, i18: i18n) {
  const chatId = notification.getChatId();
  const data = notification.getData();

  if (!data) {
    throw new TaskError('Task can not be deleted because data is empty')
  }

  if (!chatId) {
    throw new TaskError('Task can not be deleted because chatId is empty')
  }

  const params = new URLSearchParams(data.split('?')[1]);
  const taskId = params.has('task_id') && params.get('task_id');
  const buttons = [];
  let message = '';

  if (taskId) {

    await TaskService.delete({ _id: taskId });
    message = i18.t('tasks.delete.success');

  } else {

    const isAdmin = AdminService.checkAdmin(chatId);
    const tasks = await TaskService.get(isAdmin ? {} : { user_id: chatId }) as ITask[];

    tasks.forEach(task => buttons.push([{ text: task._id, callback_data: `${COMMANDS.TASKS_DELETE}?task_id=${task._id}` }]))
    message = i18.t('actions.tasks.delete-description');

  }

  buttons.push([{ text: i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }])

  await notification.send({
    text: message, options: {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: buttons
      }
    }
  });
}
