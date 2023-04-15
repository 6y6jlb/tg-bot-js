import Nodemailer from "nodemailer";
import config from '../../utils/config';
import { ApiNotification as Notification } from './Abstract';
import { IApiMessage, IApiNotification } from './types';

export class Email extends Notification {

    protected msg: IApiMessage;

    constructor(parameters: IApiNotification) {
        super(parameters);
    }

    async send() {
        try {
            await this.getTransporter().sendMail({
                from: this.message.senderName,
                to: config.SMPT_RESPONSE_EMAIL,
                subject: this.message.senderContacts,

                html: `<b>Portfolio request from ${this.message.senderName}</b>
                <br>
                <div> Контакты  - 
                <br>
                    <span>n${this.message.senderContacts}</span> 
                    </div>
                    
                <div> Имя/Организация  - 
                <br>
                    <span>${this.message.senderName}</span> 
                    </div> 
                <div> текст письма  - 
                    <p>${this.message.body}</p>> 
                    </div>`,
            })

            console.log("Message from: " + name + " sended to: " + config.SMPT_RESPONSE_EMAIL)
        } catch (error) {
            console.warn(error)
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