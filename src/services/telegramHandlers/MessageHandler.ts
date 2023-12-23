import TelegramBotApi from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { IUser } from "../../models/types";
import AdminService from "../Admin/AdminService";
import { NotificationFactory } from "../BotNotification/AbstractFactory";
import { Message } from '../BotNotification/Message';
import { TypeEnum } from '../BotNotification/consts';
import UserService from "../User/UserService";
import { commadsHandler } from './CommandsHandler';



export const messageHandler = async (bot: Bot, msg: TelegramBotApi.Message,) => {
  const userId = msg?.from?.id;
  const name = msg?.from?.username || msg?.from?.first_name;
  let user: IUser | null | undefined = null;

  try {
    user = await UserService.getById(userId);
  } catch (error: any) {
    console.log(error.message)
  }


  const language = user?.locale || msg?.from?.language_code;
  bot.localeService.changeLanguage(language);
  const notification = new NotificationFactory(TypeEnum.MESSAGE, { bot: bot.instance, msg }).build() as Message;


  if (!user) {

    await UserService.store({ telegram_id: String(userId), name: name || 'guest', locale: language })
    await AdminService.sendMesssageToAdmin(
      bot.instance, { text: bot.localeService.i18.t('notifications.common.new-user', { userId, userName: name }) }
    )

    await notification.send({ text: bot.localeService.i18.t("actions.greeting", { userName: name ?? bot.localeService.i18.t('guest') }) });

  } else if (msg.web_app_data) {

    try {

      const parsedData = JSON.parse(msg.web_app_data?.data);
      await notification.send({ text: `${parsedData && parsedData.name} ${parsedData && parsedData.language} ${parsedData && parsedData.timezone}` });

    } catch (error) {
      console.warn(error)
      await notification.send({ text: bot.localeService.i18.t('notifications.errors.something-went-wrong') });
    }

  } else {

    commadsHandler(notification, bot.localeService.i18)
  }
};
