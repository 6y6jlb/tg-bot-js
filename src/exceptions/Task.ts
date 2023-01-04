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

export class DeleteUserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DeleteTaskError";
    }
};

