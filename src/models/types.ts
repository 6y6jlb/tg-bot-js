import { Schema } from "mongoose"

export interface IUser {
    id?: number,
    created_at: Date,
    name: string,
    tz?: string,
    location?: string,
    currency?: string,
    language?: string,
}

export interface ITask {
    _id?: Schema.Types.ObjectId,
    last_call?: Date,
    user_id: number,
    event_type: EVENT_ENUM,
    options: string,
    call_at: string,
    queue?: boolean,
    tz: string,
    is_regular: boolean
}

export interface IUserSettings {
    _id?: Schema.Types.ObjectId,
    created_at: Date,
    user_id: number,
    app_type: APP_TYPE_ENUM,
}

export enum EVENT_ENUM {
    WEATHER = 1,
    REMINDER = 2
}

export enum APP_TYPE_ENUM {
    DEFAULT = 0,
    WEATHER_REQUEST = 1,
    TASK_STORE_TYPE_DEFAULT = 2,
    TASK_STORE_TYPE_WEATHER = 3,
    TASK_STORE_TYPE_REMINDER = 4,
    TASK_DELETE = 5,
    EXCHANGE_START = 6,
    EXCHANGE_STORE_TYPE_SOURCE_CURRENCY = 7,
    EXCHANGE_STORE_TYPE_TARGET_CURRENCY = 8,
}