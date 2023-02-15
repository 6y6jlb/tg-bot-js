import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { IUser } from "../../models/types";
import UserService from "../User/UserService";
import { commadsHandler } from './CommandsHandler';



const messageHandler = async (bot: Bot, msg: TelegramBotApi.Message,) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  const name = msg.from.username || msg.from.first_name;

  const user = await UserService.get({id: userId}) as IUser;

  const language = user?.language ?? msg.from?.language_code ?? 'en';

  bot.localeService.changeLanguage(language);


  if (!user) {
    
    await UserService.store({ id: String(userId), name, language })

    await bot.adminService.sendMesssageToAdmin(
      bot.instance, { text: bot.localeService.i18.t('notifications.common.new-user', { userId, userName: name }) }
    )

    await bot.instance.sendMessage(
      chatId,
      bot.localeService.i18.t("actions.greeting", { userName: name ?? bot.localeService.i18.t('guest') }),
    );

  } else if (msg.web_app_data) {

    bot.localeService.changeLanguage(user.language ?? language);
    try {

      const parsedData = JSON.parse(msg.web_app_data?.data);
      await bot.instance.sendMessage(chatId, `${parsedData && parsedData.name} ${parsedData && parsedData.language} ${parsedData && parsedData.timezone}`);
    } catch (error) {
      await bot.instance.sendMessage(chatId, bot.localeService.i18.t('notifications.errors.something-went-wrong'));
    }

  } else {

    commadsHandler(bot, msg)
  }
};


export default messageHandler;