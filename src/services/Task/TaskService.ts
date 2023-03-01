import { APP_TYPE_ENUM, EVENT_ENUM } from './../../models/types';
import moment from "moment-timezone";
import Task from "../../models/Task";
import { IDeleteTaskRequest, IGetTaskRequest, IStoreTaskRequest, IUpdateTaskRequest } from "../../requests/Task/types";
import { CreateTaskError, DeleteTaskError, TaskError, UpdateTaskError } from './../../exceptions/Task';

class TaskService {
    FORMAT: string;
    constructor() {
        this.FORMAT = 'H:mm';
    }

    async get(data: IGetTaskRequest) {
        try {
            if (data._id) {
                return await Task.findOne(data)
            } else {
                return await Task.find(data)
            }

        } catch (error) {
            throw new TaskError(error.message)
        }
    }

    async update(data: IUpdateTaskRequest) {
        try {
            return await Task.findByIdAndUpdate(data._id, data.payload, { new: true });
        } catch (error) {
            throw new UpdateTaskError(error.message)
        }
    }

    async resetQueue() {
        try {
            await Task.updateMany({ queue: true },  { $set: { queue: false } });
        } catch (error) {
            throw new TaskError(error.message)
        }
    }

    async store(data: IStoreTaskRequest) {
        try {
            let callAt = this.timeCorrection(data.call_at)
            callAt = moment.tz(callAt, this.FORMAT, data.tz).utc().format(this.FORMAT)
            return await Task.create({ ...data, call_at: callAt })
        } catch (error) {
            throw new CreateTaskError(error.message)
        }
    }

    async delete(data: IDeleteTaskRequest) {
        try {
            return await Task.findByIdAndDelete(data._id)
        } catch (error) {
            throw new DeleteTaskError(error.message)
        }
    }

    public timeCorrection(time: string) {
        let newTime = time.trim();
        if (newTime.length > 1 && newTime[0] === '0') {
            newTime = newTime.slice(1)
        }
        return newTime;
    }

    public getEventType(type: APP_TYPE_ENUM) {
        switch (type) {
            case APP_TYPE_ENUM.TASK_STORE_TYPE_EXCHANGE:
                return EVENT_ENUM.EXCHANGE
            case APP_TYPE_ENUM.TASK_STORE_TYPE_WEATHER:
                return EVENT_ENUM.WEATHER
            case APP_TYPE_ENUM.TASK_STORE_TYPE_REMINDER:
                return EVENT_ENUM.REMINDER


            default:
                throw new TaskError('Task type error. Incorrect type: ' + type);
        }
    }


}

export default new TaskService();