export interface IGetUserRequest {
    id?: string|number
}

export interface ILoginUserRequest {
    id: string|number
    password: string
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
    password?: string,
    tz?: string,
}

export interface IDeleteUserRequest {
    id: string|number
}