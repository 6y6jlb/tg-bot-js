import { i18n } from "i18next";
import TelegramBot from "node-telegram-bot-api";
import { APP_TYPE_ENUM } from "../../../models/const";
import { ITask } from "../../../models/types";
import { COMMANDS } from "../../../utils/const";
import AdminService from "../../Admin/AdminService";
import { AbstractNotification } from "../../BotNotification/AbstractNotification";
import { Callback } from "../../BotNotification/Callback";
import TaskService from "../../Task/TaskService";
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function updateTask(notification: Callback | AbstractNotification, i18: i18n) {
    const chatId = String(notification.getChatId());
    const notificator = notification.getNotificator()
    const user = await notification.getUser();

    if (!user) return;

    const isAdmin = user.telegram_id && await AdminService.checkAdmin(user.telegram_id);
    UserSettingsService.updateOrCreate({ user_id: user._id, app_type: APP_TYPE_ENUM.TASK_UPDATE, created_at: new Date() });

    const tasks = await TaskService.get(isAdmin ? {} : { user_id: user._id }) as ITask[];

    const buttons = [] as TelegramBot.InlineKeyboardButton[][];
    tasks.forEach(task => buttons.push([{ text: String(task._id), callback_data: `${COMMANDS.TASKS_SELECT_OPTIONS}?task_id=${task._id}` }]))

    await notificator.send(chatId, {
        text: i18.t('actions.tasks.update-description'), options: {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: buttons
            }
        }
    });

}
