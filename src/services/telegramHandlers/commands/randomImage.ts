import Bot from "../../../controllers/telegram/Bot";
import RandomService from "../../Random/RandomService";
import { getResetOptions } from "../template";


export async function randomImage(bot: Bot, chatId: number) {
    let imageUrl = '';
    let message = '';
    try {

        imageUrl = await RandomService.getImage();
        message = bot.localeService.i18.t('random.get-image');

    } catch (error) {
        message = error.message;

    }

    await bot.instance.sendMessage(chatId, message, getResetOptions());
    await bot.instance.sendPhoto(chatId, imageUrl);
    return { imageUrl, message };
}
