import TelegramBot from 'node-telegram-bot-api';
import { Notification } from './Abstract';
import { IBotMessage } from './types';

export class Message extends Notification {

    protected msg: TelegramBot.Message;

    constructor(parameters: IBotMessage) {
        super(parameters);
    }

    getChatId() {

        return this.msg.chat.id;
    }

    getName() {
        const name = this.msg.chat.first_name ?? this.msg.chat.last_name ?? 'guest';
        return name;
    }
    getLanguage() {
        return this.msg.from.language_code;
    }
    getText() {
        return this.msg.text;
    }

}