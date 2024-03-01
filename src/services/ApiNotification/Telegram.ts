import { TelegramError } from '../../exceptions/Telegram';
import AdminService from '../Admin/AdminService';
import { TelegramNotificator } from '../BotNotification/TelegramNotificator';
import { ApiNotification as Notification } from './Abstract';
import { IApiNotification } from './types';

export class Telegram extends Notification {

    constructor(parameters: IApiNotification) {
        super(parameters);
    }

    async send() {

        try {
            const botInstance = this.getBotInstance();
            await AdminService.sendMesssageToAdmin(botInstance, {
                textObject: { key: 'feedback.portfolio.template-tg', variables: { name: this.message.name, contacts: this.message.contacts, body: this.message.message } },
                options: {
                    parse_mode: 'HTML',
                }
            })

            console.log("Message from: " + this.message.name + " sended to admin ")
        } catch (error: any) {
            console.warn(error)
            throw new TelegramError('Telegram notification error: ' + error.message)
        }
    }

    private getBotInstance() {
        //@ts-ignore
        return global.tgBotInstance as TelegramNotificator
    }

}
