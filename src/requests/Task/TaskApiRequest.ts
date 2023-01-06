import { UpdateTaskError, DeleteTaskError } from './../../exceptions/Task';
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
        const { user_id, tz, call_at, is_regular, options, event_type } = request.body
        return { user_id, tz, call_at, is_regular, options, event_type } as IStoreTaskRequest;
    }

    update(request: Request): IUpdateTaskRequest {
        const { task_id } = request.body
        const payload = request.body

        if (task_id) {
            return { _id: task_id, payload } as IUpdateTaskRequest;
        }
        throw new UpdateTaskError('Incorrect data')
    }

    delete(request: Request): IDeleteTaskRequest {
        const { task_id } = request.query
        if (task_id) {
            return { _id: task_id } as IDeleteTaskRequest;
        }
        throw new DeleteTaskError('Incorrect data')
    }
}

export default new TaskApiRequest();