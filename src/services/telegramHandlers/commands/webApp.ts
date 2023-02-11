import Bot from "../../../controllers/telegram/Bot";
import { PAGES } from "../../../utils/const";


export async function webApp(bot: Bot, chatId: number) {
    

    await bot.instance.sendMessage(
        chatId,
        bot.localeService.i18.t("web_app.desctiption"),
        {
          reply_markup: {
            one_time_keyboard: true,
            inline_keyboard: [
              [{ text: `${bot.localeService.i18.t('buttons.weather')}`, web_app: { url: PAGES.INDEX }, }],
            ]
          }
        }
      );

   
}
