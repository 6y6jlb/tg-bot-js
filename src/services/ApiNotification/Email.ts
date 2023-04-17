import Nodemailer from "nodemailer";
import config from '../../utils/config';
import { ApiNotification as Notification } from './Abstract';
import { IApiMessage, IApiNotification } from './types';
import { EmailError } from "../../exceptions/Email";

export class Email extends Notification {

    protected message: IApiMessage;

    constructor(parameters: IApiNotification) {
        super(parameters);
    }

    async send() {
        try {
            await this.getTransporter().sendMail({
                from: this.message.senderName,
                to: config.SMPT_RESPONSE_EMAIL,
                subject: this.message.senderContacts,

                html: this.localeService.i18.t('feedback.portfolio.template-tg', { senderName: this.message.senderName, senderContacts: this.message.senderContacts, body: this.message.body }),
            })

            console.log("Message from: " + this.message.senderName + " sended to: " + config.SMPT_RESPONSE_EMAIL)
        } catch (error) {
            console.warn(error)
            throw new EmailError('Emaiol notification error: ' + error.message)
        }
    }

    private getTransporter() {
        return Nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: config.SMPT_LOGIN,
                pass: config.SMPT_PASSWORD
            },
        })
    }


}