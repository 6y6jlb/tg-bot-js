import moment from "moment-timezone";
import Task from "../../models/Task";
import { IDeleteTaskRequest, IGetTaskRequest, IStoreTaskRequest, IUpdateTaskRequest } from "../../requests/Task/types";

class TaskService {

    get(data: IGetTaskRequest) {
        if (data._id) {
            return Task.findOne(data)
        } else {
            return Task.find(data)
        }

    }

    update(data: IUpdateTaskRequest) {
        return Task.findByIdAndUpdate(data);
    }

    store(data: IStoreTaskRequest) {
        const baseFormat = 'HH:mm'
        const callAt = moment.tz(data.call_at, baseFormat, data.tz).utc().format(baseFormat)
        return Task.create({ ...data, call_at: callAt })
    }

    delete(data: IDeleteTaskRequest) {
        return Task.findByIdAndDelete(data._id)
    }


}

export default new TaskService();