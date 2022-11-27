import TelegramBotApi from "node-telegram-bot-api";

export enum HANDLER {
    MESSAGE = 1,
    STICKER
  } 

export type BotCallbackParamsType = (sendType: HANDLER, chatId: TelegramBotApi.ChatId, text: string, options?: TelegramBotApi.SendMessageOptions) => void;