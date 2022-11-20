class Task {
    
}

interface ITask {
    id: string,
    last_call?: string,
    user_id: string,
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