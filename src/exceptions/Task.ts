export class TaskError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TaskError";
    }
};

