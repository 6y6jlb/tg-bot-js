import { EVENT_ENUM, IOption } from "../../models/types"

export interface IGetTaskRequest {
    _id?: any,
    call_at?: any,
    queue?: boolean,
    user_id?: number
}

export interface IStoreTaskRequest {
    last_call?: Date,
    user_id: number,
    event_type: EVENT_ENUM,
    options: Array<IOption>,
    call_at: string,
    queue?: boolean,
    tz: string,
    is_regular: boolean
}

export interface IUpdateTaskRequest {
    _id: any
    payload: {
        last_call?: Date,
        user_id?: number,
        event_type?: EVENT_ENUM,
        options?: object,
        call_at?: string,
        queue?: boolean,
        tz?: string,
        is_regular?: boolean
    }
}

export interface IDeleteTaskRequest {
    _id: any
}