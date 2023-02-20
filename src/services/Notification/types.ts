import TelegramBot from 'node-telegram-bot-api';

export interface IMessage {
    bot: TelegramBot
    msg: TelegramBot.Message
}

export interface ICallback {
    bot: TelegramBot
    msg: TelegramBot.CallbackQuery
}

export type INotification = ICallback | IMessage;


export type ISend = ISendMessage | ISendPhoto | ISendSticker

export interface ISendMessage {
    text: string
    options?: TelegramBot.SendMessageOptions
}

export interface ISendSticker {
    sticker: string
    options?: TelegramBot.SendStickerOptions
}

export interface ISendPhoto {
    url: string
    options?: TelegramBot.SendPhotoOptions
} 