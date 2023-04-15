import { i18n } from "i18next";
import { APP_TYPE_ENUM } from "../../../models/const";
import { Callback } from "../../BotNotification/Callback";
import UserSettingsService from "../../UserSetttings/UserSettingsService";
import { Notification } from "../../BotNotification/Abstract";
import TaskService from "../../Task/TaskService";
import { ITask } from "../../../models/types";
import AdminService from "../../Admin/AdminService";
import { COMMANDS } from "../../../utils/const";


export async function updateTask(notification: Callback | Notification, i18: i18n) {
    const chatId = notification.getChatId();
    const isAdmin = AdminService.checkAdmin(chatId);
    UserSettingsService.updateOrCreate({ user_id: chatId, app_type: APP_TYPE_ENUM.TASK_UPDATE, created_at: new Date() });

    const tasks = await TaskService.get(isAdmin ? {} : { user_id: chatId }) as ITask[];

    const buttons = [];
    tasks.forEach(task => buttons.push([{ text: task._id, callback_data: `${COMMANDS.TASKS_CHOICE_OPTIONS}?task_id=${task._id}` }]))

    await notification.send({
        text: i18.t('actions.tasks.update-description'), options: {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: buttons
            }
        }
    });

}
