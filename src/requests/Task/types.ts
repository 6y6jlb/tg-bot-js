import { EVENT_ENUM } from "../../models/types"

export interface IGetTaskRequest {
    _id?: string,
    created_at?: any
}

export interface IStoreTaskRequest {
    last_call?: string,
    user_id: string,
    event_type: EVENT_ENUM,
    options: string,
    call_at: Date,
    queue?: boolean,
    tz: string,
    is_regular: boolean
}

export interface IUpdateTaskRequest {
    _id: string
    last_call?: string,
    user_id: string,
    event_type: EVENT_ENUM,
    options: string,
    call_at: Date,
    queue?: boolean,
    tz: string,
    is_regular: boolean
}

export interface IDeleteTaskRequest {
    _id: string
}