import moment from "moment-timezone";
import Task from "../../models/Task";
import { IDeleteTaskRequest, IGetTaskRequest, IStoreTaskRequest, IUpdateTaskRequest } from "../../requests/Task/types";
import { CreateTaskError, DeleteTaskError, TaskError, UpdateTaskError } from './../../exceptions/Task';

class TaskService {
    FORMAT: string;
    constructor() {
        this.FORMAT = 'H:mm';
    }

    get(data: IGetTaskRequest) {
        try {
            if (data._id) {
                return Task.findOne(data)
            } else {
                return Task.find(data)
            }

        } catch (error) {
            throw new TaskError(error.message)
        }
    }

    update(data: IUpdateTaskRequest) {
        try {
            return Task.findByIdAndUpdate(data._id, data.payload);
        } catch (error) {
            throw new UpdateTaskError(error.message)
        }
    }

    store(data: IStoreTaskRequest) {
        try {
            let callAt = this.timeCorrection(data.call_at)
            callAt = moment.tz(callAt, this.FORMAT, data.tz).utc().format(this.FORMAT)
            return Task.create({ ...data, call_at: callAt })
        } catch (error) {
            throw new CreateTaskError(error.message)
        }
    }

    delete(data: IDeleteTaskRequest) {
        try {
            return Task.findByIdAndDelete(data._id)
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


}

export default new TaskService();