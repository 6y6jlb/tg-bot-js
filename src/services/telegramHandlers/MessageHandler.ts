import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { IUser } from "../../models/types";
import { PAGES } from "../../utils/const";
import UserService from "../User/UserService";
import { commadsHandler } from './CommandsHandler';



const messageHandler = async (bot: Bot, msg: TelegramBotApi.Message,) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  const language = msg.from?.language_code || 'en';
  const name = msg.from.username || msg.from.first_name;


  const existedUser = userId ? await UserService.isUserExists(userId) : null;



  if (!existedUser) {
    bot.localeService.changeLanguage(language);

    await UserService.store({ id: String(userId), name, language })

    await bot.adminService.sendMesssageToAdmin(
      bot.instance, { text: bot.localeService.i18.t('notifications.common.new-user', { userId, userName: name }) }
    )

    await bot.instance.sendMessage(
      chatId,
      bot.localeService.i18.t("actions.greeting", { userName: name ?? bot.localeService.i18.t('guest') }),
    );

  } else if (msg.web_app_data) {

    const user = await UserService.get({ id: userId }) as IUser;
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