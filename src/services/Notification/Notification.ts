import TelegramBot,{CallbackQuery, Message} from 'node-telegram-bot-api';
import { INotification, ISend } from './types';

export class Notification {

    private msg: TelegramBot.Message | TelegramBot.CallbackQuery;
    private bot: TelegramBot;

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

    getChatId() {
        return this.isMessage ? this.msg.chat.id : this.msg.message?.chat.id;
    }

    getName() {
        const name = this.isMessage ? (this.msg.chat.first_name ?? this.msg.chat.last_name ) : (this.msg.message?.chat.first_name ??  this.msg.message?.chat.last_name)
        return this.msg.chat.first_name ?? this.msg.chat.last_name ?? 'guest'
    }
    getLanguage() {
        return this.isMessage ? this.msg.from.language_code;
    }
    getText() {
        return this.isMessage ? this.msg.text : '';
    }

    private isMessage() {
        return 'chat' in this.msg;
    }
}