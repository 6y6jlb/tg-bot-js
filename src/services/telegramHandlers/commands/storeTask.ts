import Bot from "../../../controllers/telegram/Bot";
import { APP_TYPE_ENUM, EVENT_ENUM } from "../../../models/types";
import { COMMANDS } from "../../../utils/const";
import UserSettingsService from "../../UserSetttings/UserSettingsService";


export async function storeTask(data: string, userId: number, bot: Bot, chatId: number) {
  if (data === COMMANDS.TASKS_STORE) {
    UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.TASK_STORE_TYPE_DEFAULT, created_at: new Date() });
    await bot.instance.sendMessage(
      chatId,
      `${bot.localeService.i18.t('tasks.description-type')}`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: `${bot.localeService.i18.t('buttons.tasks-type-weather')}`, callback_data: COMMANDS.TASKS_STORE + '?type=' + EVENT_ENUM[EVENT_ENUM.WEATHER] }],
            [{ text: `${bot.localeService.i18.t('buttons.tasks-type-reminder')}`, callback_data: COMMANDS.TASKS_STORE + '?type=' + EVENT_ENUM[EVENT_ENUM.REMINDER] }],
          ]
        }
      }
    );
  }

  else if (data.includes('?type=' + EVENT_ENUM[EVENT_ENUM.WEATHER])) {
    UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.TASK_STORE_TYPE_WEATHER, created_at: new Date() });
    await bot.instance.sendMessage(
      chatId,
      `${bot.localeService.i18.t('tasks.description-city')}`
    );
    await bot.instance.sendMessage(
      chatId,
      `${bot.localeService.i18.t('tasks.description-timezone')}`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: `${bot.localeService.i18.t('buttons.reset')}`, callback_data: COMMANDS.RESTART }],
          ]
        }
      }
    );
  }

  else if (data.includes('?type=' + EVENT_ENUM[EVENT_ENUM.REMINDER])) {
    UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.TASK_STORE_TYPE_REMINDER, created_at: new Date() });
    await bot.instance.sendMessage(
      chatId,
      `${bot.localeService.i18.t('tasks.description-option')}`
    );
    await bot.instance.sendMessage(
      chatId,
      `${bot.localeService.i18.t('tasks.description-timezone')}`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: `${bot.localeService.i18.t('buttons.reset')}`, callback_data: COMMANDS.RESTART }],
          ]
        }
      }
    );
  }

  else {
    console.log('else', data);
  }
}
