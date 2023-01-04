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

  public makeTask(expression: string, chatId: number, message: string) {
    cron.schedule(expression, () => {
      this.bot.sendMessage(chatId, message);
    });
  }

  private async getTasks() {
    const currentDate = moment.now();
    const nextHourDate = moment(currentDate).add(1, 'hour');
    return await TaskService.get({
      created_at: {
        $between: [currentDate, nextHourDate],
      },
    })
  }

  public async start() {
    const tasks = await this.getTasks() as ITask[];
    for (let task = 0; task < tasks.length; task++) {
      const currentTask = tasks[task];
      const callAt = moment(currentTask.call_at, 'HH:mm').toDate()
      this.makeTask(convertDateToCronExpression(callAt), currentTask.user_id, currentTask.options);

    }
  }
}