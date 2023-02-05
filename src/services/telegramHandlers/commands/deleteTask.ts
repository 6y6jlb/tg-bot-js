import Bot from "../../../controllers/telegram/Bot";
import { APP_TYPE_ENUM } from "../../../models/types";
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function deleteTask(userId: number, bot: Bot, chatId: number) {
  UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.TASK_DELETE, created_at: new Date() });
  await bot.instance.sendMessage(
    chatId,
    `${bot.localeService.i18.t('actions.tasks.delete-description')}`
  );
}
