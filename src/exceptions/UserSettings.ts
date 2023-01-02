export class UpdateUserSettingsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UpdateUserSettingsError";
    }
};

export class CreateUserSettingsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CreateUserSettingsError";
    }
};

export class DeleteUserSettingsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DeleteUserSettingsError";
    }
};

export class GetUserSettingsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GetUserSettingsError";
    }
};

