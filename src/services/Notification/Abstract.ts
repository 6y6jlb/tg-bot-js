
import TelegramBot from 'node-telegram-bot-api';
import { EntityType, TypeEnum } from './consts';
import { INotification, ISend } from './types';

export abstract class Notification {

    protected bot: TelegramBot
    protected msg: any;

    constructor(parameters: INotification) {

        this.msg = parameters.msg
        this.bot = parameters.bot
    }

    async send(params: ISend) {
        const chatId = this.getChatId();
    
        if ('url' in params) {
            await this.bot.sendPhoto(chatId, params.url, params.options);
        } else if ('sticker' in params) {
            await this.bot.sendSticker(chatId, params.sticker, params.options);
        } else if ('message' in params){
            await this.bot.sendMessage(chatId, params.text, params.options);
        }
    }

    abstract getChatId():number

    abstract getName():string

    abstract getLanguage():string
    
    protected build() {
        // @ts-ignore
        return new EntityType[this.type](this.params)
    }

}