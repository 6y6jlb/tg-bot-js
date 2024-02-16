import TelegramBot from 'node-telegram-bot-api';
import { Callback } from './Callback';
import { Message } from './Message';
import { TelegramNotificator } from './TelegramNotificator';
import { TypeEnum } from './consts';

export interface IBotMessage {
    notificator: TelegramNotificator
    msg: TelegramBot.Message
}

export interface IBotCallback {
    notificator: TelegramNotificator
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