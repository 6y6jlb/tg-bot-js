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
    options: Array<IOption>,
    call_at: string,
    queue?: boolean,
    tz: string,
    is_regular: boolean,
}

export interface IUserSettings {
    _id?: Schema.Types.ObjectId,
    created_at: Date,
    user_id: number,
    app_type: APP_TYPE_ENUM,
    payload?: ISettingPayload
}

export interface ISettingPayload {
    task_id?: string
}

export interface IOption {
    event_type: EVENT_ENUM,
    param: string
}

export enum EVENT_ENUM {
    WEATHER = "WEATHER",
    REMINDER = "REMINDER",
    EXCHANGE = "EXCHANGE",
}
export enum APP_TYPE_ENUM {
    DEFAULT = 0,
    WEATHER_REQUEST = 1,
    TASK_STORE_TYPE_DEFAULT = 2,
    TASK_STORE_TYPE_WEATHER = 3,
    TASK_STORE_TYPE_REMINDER = 4,
    TASK_STORE_TYPE_EXCHANGE = 9,
    TASK_DELETE = 5,
    EXCHANGE_START = 6,
    EXCHANGE_STORE_TYPE_SOURCE_CURRENCY = 7,
    EXCHANGE_STORE_TYPE_TARGET_CURRENCY = 8,
}

export const EVENT_OPTIONS = {
    [APP_TYPE_ENUM.TASK_STORE_TYPE_WEATHER]: EVENT_ENUM.WEATHER,
    [APP_TYPE_ENUM.TASK_STORE_TYPE_REMINDER]: EVENT_ENUM.REMINDER,
    [APP_TYPE_ENUM.TASK_STORE_TYPE_EXCHANGE]: EVENT_ENUM.EXCHANGE,
}

