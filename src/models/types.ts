import { Schema } from "mongoose"

export interface IUser {
    id?: Number,
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
    user_id: Number,
    event_type: EVENT_ENUM,
    options: string,
    call_at: Date,
    queue?: boolean,
    tz: string,
    is_regular: boolean
}

export enum EVENT_ENUM {
    WEATHER = 1,
    REMINDER = 2
}