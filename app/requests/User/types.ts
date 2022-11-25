export interface IGetUserRequest {
    _id?: string
}

export interface IStoreUserRequest {
    name: string,
    language?: string,
    currency?: string,
    location?: string,
    tz?: string,
}

export interface IUpdateUserRequest {
    _id: string
    name: string,
    language?: string,
    currency?: string,
    location?: string,
    tz?: string,
}

export interface IDeleteUserRequest {
    _id: string
}