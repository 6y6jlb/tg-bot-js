import { i18n } from 'i18next';
import { money } from "../../helpers/common";
import { exhangeRequestValidation } from "../../helpers/validation";
import { APP_TYPE_ENUM } from "../../models/const";
import { IUserSettings } from "../../models/types";
import { COMMANDS } from "../../utils/const";
import { Message } from "../BotNotification/Message";
import TaskService from "../Task/TaskService";
import TaskCreateValidator from '../Task/TaskValidationFactory';
import UserSettingsService from "../UserSetttings/UserSettingsService";
import WeatherService from "../Weather/WeatherService";
import { OPEN_WEATHER_UNITS, TEMPERATURE_SIGN } from "../Weather/const";
import XChangeService from "../XChange/XChangeService";
import { ITask } from './../../models/types';

export async function userSettingsHandler(userSettings: IUserSettings, notification: Message, i18: i18n) {
    const chatId = String(notification.getChatId());
    const notificator = notification.getNotificator()
    const lang = notification.getLanguage();
    const user = await notification.getUser();
    const text = notification.getText();
    let message = '';

    switch (userSettings.app_type) {

        case APP_TYPE_ENUM.WEATHER_REQUEST:

            const weather = await WeatherService.get({ city: text, lang });
            if (weather.icon) await notificator.send(chatId, { url: weather.icon });

            await notificator.send(chatId, {
                text: i18.t('weather.tg-string', {
                    city: weather.name,
                    temp: Math.ceil(Number(weather.main.temp)),
                    feel: Math.ceil(Number(weather.main.feels_like)),
                    humidity: weather.main.humidity,
                    sign: TEMPERATURE_SIGN[weather.units as OPEN_WEATHER_UNITS],
                    windSpeed: weather.wind.speed,
                    description: weather.weather[0].description,
                    pressure: weather.main.pressure,
                    escapeValue: false
                }) + '\n' +
                    i18.t('weather.reset-with-description'), options: {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                            ]
                        }
                    }
            });

            break;

        case APP_TYPE_ENUM.TASK_STORE_TYPE_EXCHANGE:
        case APP_TYPE_ENUM.TASK_STORE_TYPE_WEATHER:
        case APP_TYPE_ENUM.TASK_STORE_TYPE_REMINDER:
            let params = {};
            let currentTask = null;
            try {

                const eventType = TaskService.getEventType(userSettings.app_type);
                const currentOptions = { event_type: eventType, param: text }

                const taskId = userSettings.payload?.task_id;
                if (taskId) {

                    currentTask = await TaskService.get({ _id: taskId }) as ITask;
                    await TaskService.update({ _id: taskId, options: [...currentTask.options, currentOptions] });

                } else {
                    const taskValidator = new TaskCreateValidator(eventType)
                    const { options, time, timezone } = taskValidator.validate(text);
                    currentTask = await TaskService.store({ call_at: time, is_regular: false, options: [{ ...currentOptions, param: options, event_type: eventType }], tz: timezone, user_id: userSettings.user_id });
                };

                message = i18.t('tasks.store.success', { eventType: eventType.toLocaleLowerCase() }) + '\n' + i18.t('tasks.update.make-regular-description');

                params = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: i18.t('buttons.yes'), callback_data: `${COMMANDS.TASKS_MAKE_REGULAR}?task_id=${currentTask._id}` }],
                            [{ text: i18.t('buttons.event-options'), callback_data: `${COMMANDS.TASKS_SELECT_OPTIONS}?task_id=${currentTask._id}` }],
                        ]
                    }
                };

                await UserSettingsService.updateOrCreate({ user_id: user._id, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date(), payload: {} });

            } catch (error) {
                console.warn(error)
                message = i18.t('tasks.store.error');
                params = { parse_mode: 'HTML' };
            }

            await notificator.send(chatId, { text: message, options: params });
            break;

        case APP_TYPE_ENUM.TASK_DELETE:
            try {
                await TaskService.delete({ _id: text });
                await notificator.send(chatId, {
                    text: i18.t('tasks.delete.success') + '\n' + i18.t('tasks.reset-with-delete-task-description'), options: {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                            ]
                        }
                    }
                });
            } catch (error) {
                await notificator.send(chatId, {
                    text: i18.t('tasks.delete.error'), options: {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: i18.t('buttons.reset-with-delete-task-description'), callback_data: COMMANDS.RESTART }],
                            ]
                        }
                    }
                });
            }
            break;

        case APP_TYPE_ENUM.EXCHANGE_START:

            try {

                const validExchangeRequest = exhangeRequestValidation(text);
                const rate = await XChangeService.getRate(validExchangeRequest);
                const formattedRate = money(rate);
                message = `${i18.t('exchange.rate', { count: validExchangeRequest.count, current: validExchangeRequest.current, target: validExchangeRequest.target, rate: formattedRate })}\n${i18.t('exchange.reset-with-description')}`;

            } catch (error: any) {
                message = error.message;
            }

            await notificator.send(chatId, {
                text: message, options: {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: i18.t('buttons.reset'), callback_data: COMMANDS.RESTART }],
                        ]
                    }
                }
            });
        default:
            break;
    }
}
