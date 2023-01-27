export class EXchangeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EXchangeError";
    }
};