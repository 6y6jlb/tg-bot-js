import TelegramBot from "node-telegram-bot-api";
import Bot from "../../controllers/telegram/Bot";
import { exhangeRequestValidation, taskCreationValidator } from "../../helpers/validation";
import { APP_TYPE_ENUM, EVENT_ENUM, IUserSettings } from "../../models/types";
import { COMMANDS } from "../../utils/const";
import TaskService from "../Task/TaskService";
import UserSettingsService from "../UserSetttings/UserSettingsService";
import { TEMPERATURE_SIGN } from "../Weather/const";
import XChangeService from "../XChange/XChangeService";

export async function userSettingsHandler(userSettings: IUserSettings, bot: Bot, msg: TelegramBot.Message) {
    const text = msg.text;
    const chatId = msg.chat.id;
    const userId = msg.from?.id;
    let message = '';

    switch (userSettings.app_type) {

        case APP_TYPE_ENUM.WEATHER_REQUEST:

            const weather = await bot.weatherService.get({ city: text, lang: bot.localeService.getLanguage() });
            await bot.instance.sendPhoto(
                chatId, weather.icon);
            await bot.instance.sendMessage(
                chatId,
                bot.localeService.i18.t('weather.tg-string', {
                    city: weather.name, temp: Math.ceil(Number(weather.main.temp)), feel: Math.ceil(Number(weather.main.feels_like)), humidity: weather.main.humidity, sign: TEMPERATURE_SIGN[weather.units], windSpeed: weather.wind.speed, description: weather.weather[0].description, pressure: weather.main.pressure, escapeValue: false
                }) + '\n' +
                bot.localeService.i18.t('weather.reset-with-description'),
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: bot.localeService.i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                        ]
                    }
                });

            break;

        case APP_TYPE_ENUM.TASK_STORE_TYPE_WEATHER:
        case APP_TYPE_ENUM.TASK_STORE_TYPE_REMINDER:

            let params = {};
            try {
                await UserSettingsService.updateOrCreate({ user_id: userId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date() });

                const { time, options, timezone } = taskCreationValidator(text);
                const eventType = userSettings.app_type === APP_TYPE_ENUM.TASK_STORE_TYPE_REMINDER ? EVENT_ENUM.REMINDER : EVENT_ENUM.WEATHER;
                const newTask = await TaskService.store({ call_at: time, is_regular: false, options, tz: timezone, user_id: msg.from?.id, event_type: eventType });

                message = bot.localeService.i18.t('tasks.store.success', { eventType: EVENT_ENUM[eventType].toLocaleLowerCase() })
                    + '\n' +
                    bot.localeService.i18.t('tasks.update.make-regular-description');

                params = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: bot.localeService.i18.t('buttons.yes'), callback_data: `${COMMANDS.TASKS_MAKE_REGULAR}?task_id=${newTask._id}` }],
                            // [{ text: bot.localeService.i18.t('buttons.no'), callback_data: COMMANDS.RESTART }],
                        ]
                    }
                };

            } catch (error) {
                message = bot.localeService.i18.t('tasks.store.error');
                params = {
                    parse_mode: 'HTML'
                };
            }

            await bot.instance.sendMessage(chatId, message, params);
            break;

        case APP_TYPE_ENUM.TASK_DELETE:
            try {
                await TaskService.delete({ _id: text });
                await bot.instance.sendMessage(
                    chatId,
                    bot.localeService.i18.t('tasks.delete.success')
                    + '\n' +
                    bot.localeService.i18.t('tasks.reset-with-delete-task-description'),
                    {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: bot.localeService.i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                            ]
                        }
                    }
                );
            } catch (error) {
                await bot.instance.sendMessage(
                    chatId,
                    bot.localeService.i18.t('tasks.delete.error'),
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: bot.localeService.i18.t('buttons.reset-with-delete-task-description'), callback_data: COMMANDS.RESTART }],
                            ]
                        }
                    }
                );
            }
            break;

        case APP_TYPE_ENUM.EXCHANGE_START:

            try {

                const validExchangeRequest = exhangeRequestValidation(text);
                const rate = await XChangeService.getRate(validExchangeRequest);
                message = `${bot.localeService.i18.t('exchange.rate', { count: validExchangeRequest.count, current: validExchangeRequest.current, target: validExchangeRequest.target, rate })}\n${bot.localeService.i18.t('exchange.reset-with-description')}`;

            } catch (error) {
                message = error.message;
            }

            await bot.instance.sendMessage(chatId, message,
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: bot.localeService.i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                        ]
                    }
                }
            );
        default:
            break;
    }
    return message;
}
