import TelegramBot from 'node-telegram-bot-api';

export interface INotification {
    bot: TelegramBot
    msg: TelegramBot.Message | TelegramBot.CallbackQuery
}

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