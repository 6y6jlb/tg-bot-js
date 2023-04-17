import { TelegramError } from '../../exceptions/Telegram';
import AdminService from '../Admin/AdminService';
import { ApiNotification as Notification } from './Abstract';
import { IApiMessage, IApiNotification } from './types';

export class Telegram extends Notification {

    protected msg: IApiMessage;

    constructor(parameters: IApiNotification) {
        super(parameters);
    }

    async send() {

        try {
            const botInstance = this.getBotInstance();
            await AdminService.sendMesssageToAdmin(botInstance, {
                text: this.localeService.i18.t('feedback.portfolio.template-tg', { senderName: this.message.senderName, senderContacts: this.message.senderContacts, body: this.message.body }),
                options: {
                    parse_mode: 'HTML',
                }
            })

            console.log("Message from: " + this.message.senderName + " sended to admin ")
        } catch (error) {
            console.warn(error)
            throw new TelegramError('Telegram notification error: ' + error.message)
        }
    }

    private getBotInstance() {
        return global.tgBotInstance
    }

}