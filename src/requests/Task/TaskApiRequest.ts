import { Request } from "express";
import { deleteSchema, getSchema, storeSchema, updateSchema } from './schema';
import { IDeleteTaskRequest, IGetTaskRequest, IStoreTaskRequest, IUpdateTaskRequest } from "./types";

class TaskApiRequest {
    async get(request: Request): Promise<IGetTaskRequest> {
        return await getSchema.validateAsync(request.query)
    }

    async store(request: Request): Promise<IStoreTaskRequest> {
        return await storeSchema.validateAsync(request.body);
    }

    async update(request: Request): Promise<IUpdateTaskRequest> {
        const validationResult = await updateSchema.validateAsync(request.body)
        validationResult._id = validationResult.task_id;
        delete validationResult.task_id;

        return validationResult
    }

    async delete(request: Request): Promise<IDeleteTaskRequest> {
        const validationResult = await deleteSchema.validateAsync(request.query)
        validationResult._id = validationResult.task_id;
        delete validationResult.task_id;

        return validationResult;
    }
}

export default new TaskApiRequest();