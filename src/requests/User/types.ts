export interface IGetUserRequest {
    id?: string|number
}

export interface IStoreUserRequest {
    id: string|number,
    name: string,
    language?: string,
    currency?: string,
    location?: string,
    tz?: string,
}

export interface IUpdateUserRequest {
    id: string|number
    name: string,
    language?: string,
    currency?: string,
    location?: string,
    tz?: string,
}

export interface IDeleteUserRequest {
    id: string|number
}