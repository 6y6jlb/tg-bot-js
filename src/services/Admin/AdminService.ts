import moment from 'moment';
import TelegramBotApi from 'node-telegram-bot-api';
import { AdminError } from '../../exceptions/Admin';
import config from "../../utils/config";

class AdminService {
    adminList: Array<string>
    constructor() {
        this.adminList = config.ADMINS as Array<string>
    }

    async sendMesssageToAdmin(bot: TelegramBotApi, template: { text: string, options?: TelegramBotApi.SendMessageOptions }): Promise<void> {
        try {
            console.info(`Admin target message: "${template.text}" at ${moment().format('HH:mma M.D.YYYY')}`)
            for (let i = 0; i < this.adminList.length; i++) {
                await bot.sendMessage(this.adminList[i], template.text, template.options)
            }
        } catch (error: any) {
            throw new AdminError('Send message to Admin error: ' + error.message)
        }


    }

    public checkAdmin(user_id: number | string) {
        return this.adminList.includes(String(user_id));
    }
}

export default new AdminService();