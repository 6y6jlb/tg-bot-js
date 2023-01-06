import { convertDateToCronExpression } from './../../helpers/cron';
import moment from 'moment';
import * as cron from 'node-cron';
import TelegramBot from 'node-telegram-bot-api';
import { ITask } from '../../models/types';
import TaskService from '../Task/TaskService';

export class CronScheduler {
  private bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  public makeTask(expression: string, userId: number, message: string, taskId: any, timezone: string) {
    cron.schedule(expression, () => {
      try {
        TaskService.update({ _id: taskId, payload: { queue: false } })
        this.bot.sendMessage(userId, message);
        console.info(`Task executed - expr: ${expression}, user_id: ${userId}, message: ${message}, tz: ${timezone}`)
      } catch (error) {
        console.warn(error.message)
      }
    });
    console.info(`Task added - expr: ${expression}, user_id: ${userId}, message: ${message}, tz: ${timezone}`)
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
    for (let task = 0; task < tasks.length; task++) {
      const currentTask = tasks[task];
      const callAt = moment(currentTask.call_at, 'H:mm').toDate()
      const expression = convertDateToCronExpression(callAt)
      this.makeTask(expression, currentTask.user_id, currentTask.options, currentTask._id, currentTask.tz);
      TaskService.update({ _id: currentTask._id, payload: { queue: true } })
    }
  }

  public async start() {
    try {
      console.info(`Schedule started, date - ${moment().format('HH:mma M.D.YYYY')}`)
      cron.schedule('30 * * * * *', () => {
        this.callTasks();
      });
    } catch (error) {
      console.warn(error.message)
    }

  }
}