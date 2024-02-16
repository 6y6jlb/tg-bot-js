
import TelegramBotApi from "node-telegram-bot-api";
import { ISendToBot } from './types';

export class TelegramNotificator {

    protected BOT_INSTANCE: TelegramBotApi;

    constructor(instance: TelegramBotApi) {
        this.BOT_INSTANCE = instance
    }

    async send(chatId: string, params: ISendToBot) {

        if (!chatId) {
            throw new Error('Notification doesnot have chatId')
        }
        if ('url' in params) {
            await this.BOT_INSTANCE.sendPhoto(chatId, params.url, params.options);
        } else if ('sticker' in params) {
            await this.BOT_INSTANCE.sendSticker(chatId, params.sticker, params.options);
        } else if ('text' in params) {
            await this.BOT_INSTANCE.sendMessage(chatId, params.text, params.options);
        }
    }

}