export class UpdateTaskError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UpdateTaskError";
    }
};

export class CreateTaskError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CreateTaskError";
    }
};

export class DeleteTaskError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DeleteTaskError";
    }
};

export class TaskError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TaskError";
    }
};

