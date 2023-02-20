import TelegramBot from 'node-telegram-bot-api';
import { ICallback, ISend } from './types';

export class Callback {

    private msg: TelegramBot.CallbackQuery;
    private bot: TelegramBot;

    constructor(parameters: ICallback) {
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

    getChatId() {

        return this.msg.message?.chat.id;
    }

    getName() {
        const name =  this.msg.message?.chat.first_name ??  this.msg.message?.chat.last_name  ?? 'guest';
        return name;
    }
    getLanguage() {
        return this.msg.from.language_code;
    }
    getData() {
        return this.msg.data;
    }

}