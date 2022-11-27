import TelegramBotApi from 'node-telegram-bot-api';
import config from "../../utils/config";

class AdminService {
    adminList: Array<string>
    constructor() {
        this.adminList = config.ADMINS
    }

    async sendMesssageToAdmin(bot: TelegramBotApi, template: { text: string, options?: TelegramBotApi.SendMessageOptions }): Promise<void> {
        for (let i = 0; i < this.adminList.length; i++) {
            await bot.sendMessage(this.adminList[i], template.text, template.options)
        }

    }
}

export default new AdminService();