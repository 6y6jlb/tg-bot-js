import moment from 'moment';
import * as cron from 'node-cron';
import TelegramBot from 'node-telegram-bot-api';
import { money } from '../../helpers/common';
import { exhangeRequestValidation } from '../../helpers/validation';
import { ITask, IUser } from '../../models/types';
import { EVENT_ENUM } from "../../models/const";
import LocaleService from '../Locale/LocaleService';
import RandomService from '../Random/RandomService';
import TaskService from '../Task/TaskService';
import WeatherService from '../Weather/WeatherService';
import XChangeService from '../XChange/XChangeService';
import { convertDateToCronExpression } from './../../helpers/cron';
import { TEMPERATURE_SIGN } from './../Weather/const';
import UserService from '../User/UserService';

export class CronScheduler {
  private bot: TelegramBot;
  private localeService: typeof LocaleService;

  constructor(bot: TelegramBot, localeService: typeof LocaleService) {
    this.bot = bot;
    this.localeService = localeService;
  }

  public makeTask(expression: string, task: ITask) {
    const now = moment().format('HH:mma M.D.YYYY');
    const job = cron.schedule(expression, async () => {
      
      const user = await UserService.getById(task.user_id) as IUser
      if (user?.language) this.localeService.changeLanguage(user.language);
      
      

        for (let i = 0; i < task.options.length; i++) {
          try {
            const option = task.options[i];
          const {message, icon} = await this.getMessage(option.event_type, option.param);
          if(icon) {
            await this.bot.sendPhoto(task.user_id, icon)
          }
          await this.bot.sendMessage(task.user_id, message);
          } catch (error) {
            await this.bot.sendMessage(task.user_id, error.message ?? JSON.stringify(error));
            console.info(`${now}: Task id:${task._id}, ${error.message ?? JSON.stringify(error)}`)
          }
          
        
        }
        try {
        console.info(`${now}: Task was executed, task id:${task._id} expression: ${expression}, user_id: ${task.user_id}, options: ${JSON.stringify(task.options)}`)
        if (task.is_regular) {
          await TaskService.update({ _id: task._id, payload: { queue: false } })
        } else {
          await TaskService.delete({ _id: task._id })
          console.info(`${now}: Task was deleted. Task id:${task._id}`)
        }

      } catch (error) {
        console.warn(error.message)
      } finally {
        job.stop()
      } 
    });
    console.info(`${now}: Task added - expr: ${expression}, user_id: ${task.user_id}, options: ${JSON.stringify(task.options)}`)
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
      const job = cron.schedule('15 * * * * *', () => {
        this.callTasks();
        job.stop()
      });


    } catch (error) {

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
            city: weather.name, temp: Math.ceil(Number(weather.main.temp)), feel: Math.ceil(Number(weather.main.feels_like)), humidity: weather.main.humidity, sign: TEMPERATURE_SIGN[weather.units], windSpeed: weather.wind.speed, description: weather.weather[0].description, pressure: weather.main.pressure, escapeValue: false
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

          return { message: `${this.localeService.i18.t('exchange.rate', { count: validExchangeRequest.count, current: validExchangeRequest.current, target: validExchangeRequest.target, rate: formattedRate })}`}

      default:

        return { message: param };
    }
  }
}