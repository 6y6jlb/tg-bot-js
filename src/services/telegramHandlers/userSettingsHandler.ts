import { i18n } from 'i18next';
import { money } from "../../helpers/common";
import { exhangeRequestValidation, taskCreationValidator } from "../../helpers/validation";
import { APP_TYPE_ENUM, IUserSettings } from "../../models/types";
import { COMMANDS } from "../../utils/const";
import { Message } from "../Notification/Message";
import TaskService from "../Task/TaskService";
import UserSettingsService from "../UserSetttings/UserSettingsService";
import { TEMPERATURE_SIGN } from "../Weather/const";
import WeatherService from "../Weather/WeatherService";
import XChangeService from "../XChange/XChangeService";
import { EVENT_OPTIONS, ITask } from './../../models/types';

export async function userSettingsHandler(userSettings: IUserSettings, notification: Message, i18: i18n) {
    const lang = notification.getLanguage();
    const chatId = notification.getChatId();
    const text = notification.getText();
    let message = '';

    switch (userSettings.app_type) {

        case APP_TYPE_ENUM.WEATHER_REQUEST:

            const weather = await WeatherService.get({ city: text, lang });
            await notification.send({ url: weather.icon });
            await notification.send({
                text: i18.t('weather.tg-string', {
                    city: weather.name, temp: Math.ceil(Number(weather.main.temp)), feel: Math.ceil(Number(weather.main.feels_like)), humidity: weather.main.humidity, sign: TEMPERATURE_SIGN[weather.units], windSpeed: weather.wind.speed, description: weather.weather[0].description, pressure: weather.main.pressure, escapeValue: false
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

                await UserSettingsService.updateOrCreate({ user_id: chatId, app_type: APP_TYPE_ENUM.DEFAULT, created_at: new Date(), payload: {}});

                
                const eventType = TaskService.getEventType(userSettings.app_type);
                const newParams = { event_type: EVENT_OPTIONS[userSettings.app_type], param: text }

                if (userSettings.payload?.task_id) {

                    currentTask = await TaskService.get({ _id: userSettings.payload?.task_id }) as ITask;
                    await TaskService.update({ _id: userSettings.payload?.task_id, payload: { options: [...currentTask.options, newParams] } });

                } else {
                    const { time, options, timezone } = taskCreationValidator(text);
                    currentTask = await TaskService.store({ call_at: time, is_regular: false, options: [{...newParams, param: options}], tz: timezone, user_id: chatId, event_type: eventType });
                };

                message = i18.t('tasks.store.success', { eventType: eventType.toLocaleLowerCase() }) + '\n' + i18.t('tasks.update.make-regular-description');

                params = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: i18.t('buttons.yes'), callback_data: `${COMMANDS.TASKS_MAKE_REGULAR}?task_id=${currentTask._id}` }],
                            [{ text: i18.t('buttons.event-options'), callback_data: `${COMMANDS.TASKS_CHOICE_OPTIONS}?task_id=${currentTask._id}` }],
                        ]
                    }
                };

            } catch (error) {
                console.warn(error)
                message = i18.t('tasks.store.error');
                params = { parse_mode: 'HTML' };
            }

            await notification.send({ text: message, options: params });
            break;

        case APP_TYPE_ENUM.TASK_DELETE:
            try {
                await TaskService.delete({ _id: text });
                await notification.send({
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
                await notification.send({
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

            } catch (error) {
                message = error.message;
            }

            await notification.send({
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
