import { EVENT_ENUM } from "../../models/types"

export interface IGetTaskRequest {
    _id?: any,
    call_at?: any,
    queue?: boolean,
}

export interface IStoreTaskRequest {
    last_call?: Date,
    user_id: number,
    event_type: EVENT_ENUM,
    options: string,
    call_at: string,
    queue?: boolean,
    tz: string,
    is_regular: boolean
}

export interface IUpdateTaskRequest {
    _id: any
    last_call?: Date,
    user_id?: number,
    event_type?: EVENT_ENUM,
    options?: string,
    call_at?: string,
    queue?: boolean,
    tz?: string,
    is_regular?: boolean
}

export interface IDeleteTaskRequest {
    _id: any
}