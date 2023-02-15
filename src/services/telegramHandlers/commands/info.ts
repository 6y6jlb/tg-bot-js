import moment from "moment-timezone";
import Bot from "../../../controllers/telegram/Bot";
import { IUser } from "../../../models/types";
import UserService from "../../User/UserService";


export async function info(user: IUser, userId: number, bot: Bot, chatId: number) {
    let message = '';
    try {
        user = await UserService.get({ id: userId }) as IUser;

        const createdAt = moment(user.created_at).tz(user.tz).format('HH:mma M.D.YYYY');

        message = bot.localeService.i18.t('actions.info', { name: user.name, userId: user.id, lang: user.language, tz: user.tz, createdAt });
    } catch (error) {
        message = error.message;
    }

    await bot.instance.sendMessage(chatId, message, {
        parse_mode: 'HTML',
    });
}
