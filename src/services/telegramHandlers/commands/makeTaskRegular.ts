import Bot from "../../../controllers/telegram/Bot";
import TaskService from '../../Task/TaskService';

export async function makeTaskRegular(data: string, bot: Bot, chatId: number) {
  const params = new URLSearchParams(data.split('?')[1]);
  const taskId = params.has('task_id') && params.get('task_id');
  if (taskId) {
    await TaskService.update({ _id: taskId, payload: { is_regular: true } });
    await bot.instance.sendMessage(
      chatId,
      `${bot.localeService.i18.t('tasks.update.success')}`);
  } else {
    await bot.instance.sendMessage(
      chatId,
      `${bot.localeService.i18.t('tasks.update.error')}`);
  }
}
