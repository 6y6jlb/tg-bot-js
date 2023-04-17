export class AdminError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Administrator error";
    }
};