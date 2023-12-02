import { Notification } from './Abstract';
import { IBotMessage } from './types';

export class Message extends Notification {

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