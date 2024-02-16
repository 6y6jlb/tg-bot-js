import TelegramBot from 'node-telegram-bot-api';
import { AbstractNotification } from './AbstractNotification';
import { IBotCallback } from './types';
import UserService from '../User/UserService';
import { IUser } from '../../models/types';
import { UserError } from '../../exceptions/User';
import { USER_ID_ENUM } from '../../models/const';
import { TelegramNotificator } from './TelegramNotificator';

export class Callback extends AbstractNotification {

    constructor(parameters: IBotCallback) {
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

    getNotificator(): TelegramNotificator {
        return this.notificator;
    }

    getMsg(): any {
        return this.msg;
    }

    async getUser(): Promise<IUser> {
        const user = await UserService.getById(this.getChatId(), USER_ID_ENUM.TELEGRAM_ID);
        if (!user) {
            throw new UserError('User should exist')
        }
        return user;
    }

}