import { i18n } from 'i18next';
import moment from "moment";
import { EVENT_ENUM, ITask } from "../../../models/types";
import { COMMANDS } from "../../../utils/const";
import AdminService from "../../Admin/AdminService";
import { Message } from "../../Notification/Message";
import TaskService from "../../Task/TaskService";


export async function tasks(notification: Message, i18: i18n) {
    const chatId = notification.getChatId();
    const isAdmin = AdminService.checkAdmin(chatId);
    const tasks = await TaskService.get(isAdmin ? {} : { user_id: chatId }) as ITask[];
    let message = i18.t('tasks.info-title');

    for (let task = 0; task < tasks.length; task++) {
        const currentTask = tasks[task];
        const callAt = moment.tz(TaskService.timeCorrection(currentTask.call_at), TaskService.FORMAT, 'UTC').tz(currentTask.tz).format(TaskService.FORMAT);
        message += `${i18.t('tasks.info-line', { taskId: currentTask._id, userId: currentTask.user_id, event: EVENT_ENUM[currentTask.event_type], options: currentTask.options, date: callAt, regular_desctription: i18.t(`tasks.reqular.${String(currentTask.is_regular)}`), escapeValue: false })}`;

    }
    await notification.send({
        text: message, options: {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [{ text: i18.t('buttons.tasks-new'), callback_data: COMMANDS.TASKS_STORE }],
                    [{ text: i18.t('buttons.tasks-delete'), callback_data: COMMANDS.TASKS_DELETE }],
                ]
            }
        }
    });

}
