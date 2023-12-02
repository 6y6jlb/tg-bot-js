
import TelegramBot from 'node-telegram-bot-api';
import { EntityType } from './consts';
import { IBotNotification, ISendToBot } from './types';

export abstract class Notification {

    protected bot: TelegramBot
    protected msg: any;

    constructor(parameters: IBotNotification) {

        this.msg = parameters.msg
        this.bot = parameters.bot
    }

    async send(params: ISendToBot) {
        const chatId = this.getChatId();

        if (!chatId) {
            throw new Error('Notification doesnot have chatId')
        }

        if ('url' in params) {
            await this.bot.sendPhoto(chatId, params.url, params.options);
        } else if ('sticker' in params) {
            await this.bot.sendSticker(chatId, params.sticker, params.options);
        } else if ('text' in params) {
            await this.bot.sendMessage(chatId, params.text, params.options);
        }
    }

    abstract getChatId(): number | string | undefined

    abstract getName(): string | undefined

    abstract getLanguage(): string | undefined

    protected build() {
        // @ts-ignore
        return new EntityType[this.type](this.params)
    }

}