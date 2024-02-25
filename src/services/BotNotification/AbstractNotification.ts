
import { IUser } from '../../models/types';
import { TelegramNotificator } from './TelegramNotificator';
import { EntityType } from './consts';
import { IBotNotification } from './types';

export abstract class AbstractNotification {

    protected notificator: TelegramNotificator
    protected msg: any;

    constructor(parameters: IBotNotification) {

        this.msg = parameters.msg
        this.notificator = parameters.notificator
    }

    abstract getChatId(): number | string | undefined

    abstract getUser(): Promise<IUser | undefined>

    abstract getName(): string | undefined

    abstract getLanguage(): string | undefined

    abstract getNotificator(): TelegramNotificator

    abstract getMsg(): any

    protected build() {
        // @ts-ignore
        return new EntityType[this.type](this.params)
    }

}