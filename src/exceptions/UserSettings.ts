export class UserSettingsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserSettingsError";
    }
};

