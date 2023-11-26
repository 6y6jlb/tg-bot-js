export type UserConditionalCredetial =
    | { email: string; telegram_id?: never }
    | { telegram_id: string | number; email?: never };

export type GetUserRequest = UserConditionalCredetial

export type LoginUserRequest = UserConditionalCredetial & {
    password: string
}


export type StoreUserRequest = UserConditionalCredetial & {
    name: string,
    locale?: string,
    currency?: string,
    password?: string,
    location?: string,
    tz?: string,
}

export type UpdateUserRequest = UserConditionalCredetial & {
    name?: string,
    locale?: string,
    currency?: string,
    location?: string,
    password?: string,
    tz?: string,
}

export type DeleteUserRequest = UserConditionalCredetial

export type ResetUserPasswordRequest = UserConditionalCredetial
