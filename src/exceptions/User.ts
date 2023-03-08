export class UpdateUserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UpdateUserError";
    }
};

export class CreateUserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CreateUserError";
    }
};

export class DeleteUserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DeleteUserError";
    }
};

export class UserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserError";
    }
};

