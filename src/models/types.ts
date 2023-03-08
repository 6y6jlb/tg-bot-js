import { Schema } from "mongoose"
import { APP_TYPE_ENUM, EVENT_ENUM } from "./const"

export interface IUser {
    id?: number,
    created_at: Date,
    name: string,
    tz?: string,
    location?: string,
    currency?: string,
    language?: string,
    hash?: string,
    salt?: string,
    setPassword?: (password: string) => void,
    validatePassword?: (password: string) => boolean,
    save: () => void,
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

