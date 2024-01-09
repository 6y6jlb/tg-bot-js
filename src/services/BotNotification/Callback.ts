import TelegramBot from 'node-telegram-bot-api';
import { Notification } from './Abstract';
import { IBotCallback } from './types';
import UserService from '../User/UserService';
import { IUser } from '../../models/types';
import { UserError } from '../../exceptions/User';

export class Callback extends Notification {

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

    async getUser(): Promise<IUser> {
        const user = await UserService.getById(this.getChatId());
        if (!user) {
            throw new UserError('User should exist')
        }
        return user;
    }

}