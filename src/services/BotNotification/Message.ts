import { UserError } from '../../exceptions/User';
import { IUser } from '../../models/types';
import UserService from '../User/UserService';
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

    async getUser(): Promise<IUser> {
        const user = await UserService.getById(this.getChatId());
        if (!user) {
            throw new UserError('User should exist')
        }
        return user;
    }

}