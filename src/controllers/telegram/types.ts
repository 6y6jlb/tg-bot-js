import TelegramBotApi from "node-telegram-bot-api";

declare global {
    var tgBotInstance: TelegramBotApi;
}