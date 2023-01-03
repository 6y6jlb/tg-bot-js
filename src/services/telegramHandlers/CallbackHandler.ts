
import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { APP_TYPE_ENUM } from "../../models/types";
import { COMMANDS } from "../../utils/const";
import UserSettingsService from "../UserSetttings/UserSettingsService";


const callbackHandler = async (bot:Bot ,msg: TelegramBotApi.CallbackQuery) => {
    const data = msg.data;
    const chatId = msg.message?.chat.id;
    const userId = msg.from?.id;
    console.log(msg)
    switch (data) {
      case COMMANDS.RESTART:
        UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() })
        await bot.instance.sendMessage(
          chatId,
          `${bot.localeService.i18.t('actions.reset.description')}`
        );
        break;
        
      default:
        await bot.instance.sendMessage(chatId, bot.localeService.i18.t('actions.undefined.descriprion'));
        break;
    }


  };


  export default callbackHandler