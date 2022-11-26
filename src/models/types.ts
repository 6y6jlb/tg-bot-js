import { Schema } from "mongoose"

export interface IUser {
    _id?: Schema.Types.ObjectId,
    created_at: Date,
    name: string,
    tz?: string,
    location?: string,
    currency?: string,
    language?: string,
    mess_count: number
}

export interface ITask {
    _id?: Schema.Types.ObjectId,
    last_call?: Date,
    user_id: Schema.Types.ObjectId,
    event_type: EVENT_ENUM,
    options: string,
    call_at_hour: number,
    call_at_minute: number,
    queue?: boolean,
    tz: string,
    is_regular: boolean
}

export enum EVENT_ENUM {
    WEATHER = 1,
    REMINDER = 2
}