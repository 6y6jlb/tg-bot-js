import Bot from "../../../controllers/telegram/Bot";
import { COMMANDS } from "../../../utils/const";
import XChangeService from "../../XChange/XChangeService";

export async function currencies(bot: Bot, chatId: number) {
    let message = bot.localeService.i18.t('exchange.currencies');
    try {
        const currencies = await XChangeService.getCurrency();
        for (const [key, value] of Object.entries(currencies)) {
            message += `\n${key}: ${value}`
            
        }
    } catch (error) {
        message = error.message;
    }

    await bot.instance.sendMessage(
        chatId,
        message,
        {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [{ text: bot.localeService.i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                ]
            }
        }
    );
    return message;
}
