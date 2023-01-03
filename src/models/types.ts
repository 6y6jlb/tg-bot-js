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
    call_at: String,
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
    WEATHER = 1,
    TASK = 2,
}