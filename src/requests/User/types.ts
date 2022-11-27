export interface IGetUserRequest {
    id?: string
}

export interface IStoreUserRequest {
    id: string,
    name: string,
    language?: string,
    currency?: string,
    location?: string,
    tz?: string,
}

export interface IUpdateUserRequest {
    id: string
    name: string,
    language?: string,
    currency?: string,
    location?: string,
    tz?: string,
}

export interface IDeleteUserRequest {
    id: string
}