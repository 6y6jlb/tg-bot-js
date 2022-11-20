import { HANDLER } from "./consts";
import TelegramBotApi from "node-telegram-bot-api";


export type BotCallbackParamsType = (sendType: HANDLER, chatId: TelegramBotApi.ChatId, text: string, options?: TelegramBotApi.SendMessageOptions) => void;