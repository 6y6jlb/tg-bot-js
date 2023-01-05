import moment from 'moment';
import TelegramBotApi from 'node-telegram-bot-api';
import config from "../../utils/config";

class AdminService {
    adminList: Array<string>
    constructor() {
        this.adminList = config.ADMINS
    }

    async sendMesssageToAdmin(bot: TelegramBotApi, template: { text: string, options?: TelegramBotApi.SendMessageOptions }): Promise<void> {
        console.info(`Admin target message: ${template.text} at ${moment().format('HH:mma M.D.YYYY')}`)
        for (let i = 0; i < this.adminList.length; i++) {
            await bot.sendMessage(this.adminList[i], template.text, template.options)
        }

    }

    public checkAdmin(user_id: number) {
        return this.adminList.includes(String(user_id));
    }
}

export default new AdminService();