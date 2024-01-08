import { IOption } from "../../models/types"
import { EVENT_ENUM } from "../../models/const"
import { Schema } from "mongoose"

export interface IGetTaskRequest {
    _id?: Schema.Types.ObjectId,
    call_at?: any,
    queue?: boolean,
    user_id?: Schema.Types.ObjectId
}

export interface IStoreTaskRequest {
    last_call?: Date,
    user_id: Schema.Types.ObjectId,
    event_type: EVENT_ENUM,
    options: Array<IOption>,
    call_at: string,
    queue?: boolean,
    tz: string,
    is_regular: boolean
}

export interface IUpdateTaskRequest {
    _id: Schema.Types.ObjectId,
    user_id?: Schema.Types.ObjectId,
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
    _id: Schema.Types.ObjectId,
    user_id?: Schema.Types.ObjectId
}