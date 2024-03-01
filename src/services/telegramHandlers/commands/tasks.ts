import { i18n } from 'i18next';
import moment from "moment";
import { EVENT_ENUM } from "../../../models/const";
import { ITask } from "../../../models/types";
import { COMMANDS } from "../../../utils/const";
import AdminService from "../../Admin/AdminService";
import { Message } from "../../BotNotification/Message";
import TaskService from "../../Task/TaskService";


export async function tasks(notification: Message, i18: i18n) {
    const chatId = String(notification.getChatId());
    const notificator = notification.getNotificator()
    const user = await notification.getUser();

    if (!user) return;

    const isAdmin = user.telegram_id && await AdminService.checkAdmin(user.telegram_id);
    const tasks = await TaskService.get(isAdmin ? {} : { user_id: user._id }) as ITask[];
    let message = i18.t('tasks.info-title');

    for (let task = 0; task < tasks.length; task++) {

        const currentTask = tasks[task];
        const callAt = moment.tz(TaskService.timeCorrection(currentTask.call_at), TaskService.FORMAT, 'UTC').tz(currentTask.tz).format(TaskService.FORMAT);
        message += `${i18.t('tasks.info-line', { taskId: currentTask._id, userId: currentTask.user_id, date: callAt, regular_desctription: i18.t(`tasks.reqular.${String(currentTask.is_regular)}`), escapeValue: false })}`;

        for (let option = 0; option < currentTask.options.length; option++) {
            const element = currentTask.options[option];
            message += `${i18.t('tasks.event-line', { event: EVENT_ENUM[element.event_type], options: element.param, escapeValue: false })}`;

        }
    }
    await notificator.send(chatId, {
        text: message, options: {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [{ text: i18.t('buttons.tasks-new'), callback_data: COMMANDS.TASKS_STORE }],
                    [{ text: i18.t('buttons.tasks-delete'), callback_data: COMMANDS.TASKS_DELETE }],
                    [{ text: i18.t('buttons.tasks-update'), callback_data: COMMANDS.TASKS_UPDATE }],
                ]
            }
        }
    });

}
