import { USER_ID_ENUM } from '../../models/const';
import { IUser } from '../../models/types';
import { COMMANDS } from '../../utils/const';
import UserService from '../User/UserService';
import { AbstractNotification } from './AbstractNotification';
import { TelegramNotificator } from './TelegramNotificator';
import { IBotMessage } from './types';

export class Message extends AbstractNotification {

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

    getNotificator(): TelegramNotificator {
        return this.notificator;
    }

    getMsg(): any {
        return this.msg
    }

    async getUser(): Promise<IUser | undefined> {
        const user = await UserService.getById(this.getChatId(), USER_ID_ENUM.TELEGRAM_ID);
        if (!user || !this.getText().includes(COMMANDS.START)) {
            await this.getNotificator().send(this.getChatId(), { text: COMMANDS.START + ' ' + this.getChatId() })
            return;
        }

        return user;
    }

}