export class NotificationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Notification error";
    }
};