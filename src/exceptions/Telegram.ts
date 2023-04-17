export class TelegramError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Telegram error";
    }
};