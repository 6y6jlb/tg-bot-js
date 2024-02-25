import moment from 'moment';
import * as cron from 'node-cron';
import { TaskError } from '../../exceptions/Task';
import { UserError } from '../../exceptions/User';
import { money } from '../../helpers/common';
import { exhangeRequestValidation } from '../../helpers/validation';
import { EVENT_ENUM, USER_ID_ENUM } from "../../models/const";
import { ITask, IUser } from '../../models/types';
import { TelegramNotificator } from '../BotNotification/TelegramNotificator';
import LocaleService from '../Locale/LocaleService';
import RandomService from '../Random/RandomService';
import TaskService from '../Task/TaskService';
import UserService from '../User/UserService';
import WeatherService from '../Weather/WeatherService';
import XChangeService from '../XChange/XChangeService';
import { convertDateToCronExpression } from './../../helpers/cron';
import { OPEN_WEATHER_UNITS, TEMPERATURE_SIGN } from './../Weather/const';

export class CronScheduler {
  private notificator: TelegramNotificator;
  private localeService: typeof LocaleService;

  constructor(notificator: TelegramNotificator, localeService: typeof LocaleService) {
    this.notificator = notificator;
    this.localeService = localeService;
  }

  public async makeTask(expression: string, task: ITask) {
    const now = moment().format('HH:mma M.D.YYYY');
    const user = await UserService.getById(task.user_id, USER_ID_ENUM.MONGO_ID) as IUser;

    if (!user) return;

    const job = cron.schedule(expression, async () => {

      if (!user.telegram_id) {
        throw new UserError(`$user ${user._id} does not have telegram id`)
      }

      if (user?.locale) this.localeService.changeLanguage(user.locale);
      const chatId = String(user.telegram_id)

      for (let i = 0; i < task.options.length; i++) {
        try {
          const option = task.options[i];
          const { message, icon } = await this.getMessage(option.event_type, option.param);
          if (icon) {
            await this.notificator.send(chatId, { url: icon })
          }
          await this.notificator.send(chatId, { text: message });
        } catch (error: any) {
          await this.notificator.send(chatId, { text: error.message ?? JSON.stringify(error) });
          console.info(`${now}: Task id:${task._id}, ${error.message ?? JSON.stringify(error)}`)
        }

      }
      try {
        console.info(`${now}: Task was executed, task id:${task._id} expression: ${expression}, user_id: ${task.user_id}, options: ${JSON.stringify(task.options)}`)

        if (!task._id) {
          throw new TaskError('Task has not id')
        }

        if (task.is_regular) {
          await TaskService.update({ _id: task._id, queue: false })
        } else {
          await TaskService.delete({ _id: task._id })
          console.info(`${now}: Task was deleted. Task id:${task._id}`)
        }

      } catch (error: any) {
        console.warn(error.message)
      } finally {
        job.stop()
      }
    });
    console.info(`${now}: Task added - expression at: ${expression}, user_id: ${task.user_id}, telegram_id: ${user.telegram_id}, options: ${JSON.stringify(task.options)}`)
  }

  private async getTasks() {
    const currentDate = moment(new Date()).format('H:mm');
    const nextHourDate = moment(currentDate, 'H:mm').add(1, 'hour').format('H:mm');
    return await TaskService.get({
      queue: false,
      call_at: {
        $gt: currentDate,
        $lt: nextHourDate,
      },
    })
  }

  private async callTasks() {

    const tasks = await this.getTasks() as ITask[];

    for (let i = 0; i < tasks.length; i++) {
      const currentTask = tasks[i] as ITask;
      const callAt = moment(currentTask.call_at, 'H:mm').toDate()
      const expression = convertDateToCronExpression(callAt)

      this.makeTask(expression, currentTask);

      if (!currentTask._id) {
        throw new TaskError('Task has not id')
      }

      TaskService.update({ _id: currentTask._id, queue: true })
    }
  }

  public async start() {

    try {

      console.info(`Schedule started, date - ${moment().format('HH:mma MM.DD.YYYY')}`)
      const job = cron.schedule('15 * * * * *', () => {
        this.callTasks();
        job.stop()
      });


    } catch (error: any) {
      console.warn(error.message)
    }
  }

  private async getMessage(eventType: EVENT_ENUM, param: string) {

    switch (eventType) {

      case EVENT_ENUM.WEATHER:

        const weather = await WeatherService.get({ city: param });

        return {
          icon: weather.icon,
          message: this.localeService.i18.t('weather.tg-string', {
            city: weather.name,
            temp: Math.ceil(Number(weather.main.temp)),
            feel: Math.ceil(Number(weather.main.feels_like)),
            humidity: weather.main.humidity,
            sign: TEMPERATURE_SIGN[weather.units as OPEN_WEATHER_UNITS],
            windSpeed: weather.wind.speed,
            description: weather.weather[0].description,
            pressure: weather.main.pressure,
            escapeValue: false
          })
        };

      case EVENT_ENUM.REMINDER:
        const icon = await RandomService.getImage()
        return {
          icon, message: param
        }

      case EVENT_ENUM.EXCHANGE:

        const validExchangeRequest = exhangeRequestValidation(param);
        const exchange = await XChangeService.getRate(validExchangeRequest);
        const formattedRate = money(exchange);

        return { message: `${this.localeService.i18.t('exchange.rate', { count: validExchangeRequest.count, current: validExchangeRequest.current, target: validExchangeRequest.target, rate: formattedRate })}` }

      default:

        return { message: param };
    }
  }
}
