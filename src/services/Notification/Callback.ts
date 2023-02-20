import TelegramBot from 'node-telegram-bot-api';
import { Notification } from './Abstract';
import { ICallback } from './types';

export class Callback extends Notification {

    protected msg: TelegramBot.CallbackQuery;

    constructor(parameters: ICallback) {
        super(parameters);
    }

    getChatId() {

        return this.msg.message?.chat.id;
    }

    getName() {
        const name = this.msg.message?.chat.first_name ?? this.msg.message?.chat.last_name ?? 'guest';
        return name;
    }
    getLanguage() {
        return this.msg.from.language_code;
    }
    getData() {
        return this.msg.data;
    }

}