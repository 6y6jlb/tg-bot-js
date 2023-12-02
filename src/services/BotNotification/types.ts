import TelegramBot from 'node-telegram-bot-api';
import { TypeEnum } from './consts';
import { Message } from './Message';
import { Callback } from './Callback';

export interface IBotMessage {
    bot: TelegramBot
    msg: TelegramBot.Message
}

export interface IBotCallback {
    bot: TelegramBot
    msg: TelegramBot.CallbackQuery
}

export type IBotNotification = IBotCallback | IBotMessage;


export type ISendToBot = ISendBotMessage | ISendBotPhoto | ISendBotSticker

export interface ISendBotMessage {
    text: string
    options?: TelegramBot.SendMessageOptions
}

export interface ISendBotSticker {
    sticker: string
    options?: TelegramBot.SendStickerOptions
}

export interface ISendBotPhoto {
    url: string
    options?: TelegramBot.SendPhotoOptions
}
export interface TypeToClassMapping {
    [TypeEnum.MESSAGE]: Message;
    [TypeEnum.CALLBACK]: Callback;
}