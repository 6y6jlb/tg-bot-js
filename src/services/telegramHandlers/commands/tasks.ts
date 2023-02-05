import moment from "moment";
import Bot from "../../../controllers/telegram/Bot";
import { EVENT_ENUM, ITask } from "../../../models/types";
import { COMMANDS } from "../../../utils/const";
import TaskService from "../../Task/TaskService";


export async function tasks(bot: Bot, userId: number, chatId: number) {
    const isAdmin = bot.adminService.checkAdmin(userId);
    const tasks = await TaskService.get(isAdmin ? {} : { user_id: userId }) as ITask[];
    let message = bot.localeService.i18.t('tasks.info-title');

    for (let task = 0; task < tasks.length; task++) {
        const currentTask = tasks[task];
        const callAt = moment.tz(TaskService.timeCorrection(currentTask.call_at), TaskService.FORMAT, 'UTC').tz(currentTask.tz).format(TaskService.FORMAT);
        message += `${bot.localeService.i18.t('tasks.info-line', { taskId: currentTask._id, userId: currentTask.user_id, event: EVENT_ENUM[currentTask.event_type], options: currentTask.options, date: callAt, regular_desctription: bot.localeService.i18.t(`tasks.reqular.${String(currentTask.is_regular)}`), escapeValue: false })}`;

    }

    await bot.instance.sendMessage(chatId, message, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [{ text: bot.localeService.i18.t('buttons.tasks-new'), callback_data: COMMANDS.TASKS_STORE }],
                [{ text: bot.localeService.i18.t('buttons.tasks-delete'), callback_data: COMMANDS.TASKS_DELETE }],
            ]
        }
    });
    return message;
}
