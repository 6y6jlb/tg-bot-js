import { Request } from "express";
import { IDeleteTaskRequest, IGetTaskRequest, IStoreTaskRequest, IUpdateTaskRequest } from "./types";

class TaskApiRequest {
    get(request: Request): IGetTaskRequest {
        const { task_id } = request.query
        if (task_id) {
            return { _id: task_id } as IGetTaskRequest;
        }
        return {}
    }


    store(request: Request): IStoreTaskRequest {
        const {tz, call_at_hour, call_at_minute, is_regular, options, event_type} = request.body
        return { tz, call_at_hour, call_at_minute, is_regular, options, event_type } as IStoreTaskRequest;
    }

    update(request: Request): IUpdateTaskRequest {
        const { task_id,tz, call_at_hour, call_at_minute, is_regular, options, event_type} = request.body
        if (task_id) {
            return { _id: task_id, tz, call_at_hour, call_at_minute, is_regular, options, event_type } as IUpdateTaskRequest;
        }
        throw new Error('Incorrect data')
    }

    delete(request: Request): IDeleteTaskRequest {
        const { task_id } = request.query
        if (task_id) {
            return { _id: task_id } as IDeleteTaskRequest;
        }
        throw new Error('Incorrect data')
    }
}

export default new TaskApiRequest();