import { TEMPERATURE_SIGN } from './../Weather/const';
import { convertDateToCronExpression } from './../../helpers/cron';
import moment from 'moment';
import * as cron from 'node-cron';
import TelegramBot from 'node-telegram-bot-api';
import { EVENT_ENUM, ITask } from '../../models/types';
import TaskService from '../Task/TaskService';
import WeatherService from '../Weather/WeatherService';
import LocaleService from '../Locale/LocaleService';

export class CronScheduler {
  private bot: TelegramBot;
  private localeService: typeof LocaleService;

  constructor(bot: TelegramBot, localeService: typeof LocaleService) {
    this.bot = bot;
    this.localeService = localeService;
  }

  public makeTask(expression: string, task: ITask) {
    cron.schedule(expression, async () => {
      try {
        await TaskService.update({ _id: task._id, payload: { queue: false } })
        const message = await this.getMessage(task.event_type, task.options);
        await this.bot.sendMessage(task.user_id, message);
        console.info(`Task executed - expr: ${expression}, user_id: ${task.user_id}, options: ${task.options}`)
      } catch (error) {
        console.warn(error.message)
      }
    });
    console.info(`Task added - expr: ${expression}, user_id: ${task.user_id}, options: ${task.options}`)
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
      const currentTask = tasks[i];
      const callAt = moment(currentTask.call_at, 'H:mm').toDate()
      const expression = convertDateToCronExpression(callAt)
      this.makeTask(expression, currentTask);
      TaskService.update({ _id: currentTask._id, payload: { queue: true } })
    }
  }

  public async start() {
    try {
      console.info(`Schedule started, date - ${moment().format('HH:mma MM.DD.YYYY')}`)
      cron.schedule('30 * * * * *', () => {
        this.callTasks();
      });
    } catch (error) {
      console.warn(error.message)
    }
  }

  private async getMessage(eventType: EVENT_ENUM, options: string) {
    switch (eventType) {
      case EVENT_ENUM.WEATHER:
        const weather = await WeatherService.get({ city: options })
        return this.localeService.i18.t('weather.tg-string', {
          city: weather.name, temp: String(weather.main.temp), feel: weather.main.feels_like, humidity: weather.main.humidity, sign: TEMPERATURE_SIGN[weather.units], windSpeed: weather.wind.speed, description: weather.weather[0].description, pressure: weather.main.pressure, escapeValue: false
        });


      default:
        return options;
    }
  }
}