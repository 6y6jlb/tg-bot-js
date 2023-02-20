import TelegramBot from 'node-telegram-bot-api';
import { IMessage, ISend } from './types';

export class Message {

    private msg: TelegramBot.Message;
    private bot: TelegramBot;

    constructor(parameters: IMessage) {
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

        return  this.msg.chat.id ;
    }

    getName() {
        const name =  this.msg.chat.first_name ?? this.msg.chat.last_name ?? 'guest'; 
        return name;
    }
    getLanguage() {
        return  this.msg.from.language_code;
    }
    getText() {
        return  this.msg.text;
    }

}