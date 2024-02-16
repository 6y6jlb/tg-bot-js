import moment from 'moment';
import TelegramBotApi from 'node-telegram-bot-api';
import { AdminError } from '../../exceptions/Admin';
import config from "../../utils/config";
import { TelegramNotificator } from '../BotNotification/TelegramNotificator';

class AdminService {
    adminList: Array<string>
    constructor() {
        this.adminList = config.ADMINS as Array<string>
    }

    async sendMesssageToAdmin(notificator: TelegramNotificator, template: { text: string, options?: TelegramBotApi.SendMessageOptions }): Promise<void> {
        try {
            console.info(`Admin target message: "${template.text}" at ${moment().format('HH:mma M.D.YYYY')}`)
            for (let i = 0; i < this.adminList.length; i++) {
                await notificator.send(this.adminList[i], template)
            }
        } catch (error: any) {
            throw new AdminError('Send message to Admin error: ' + error.message)
        }


    }

    public checkAdmin(user_id: number | string) {
        return user_id && this.adminList.includes(String(user_id));
    }
}

export default new AdminService();