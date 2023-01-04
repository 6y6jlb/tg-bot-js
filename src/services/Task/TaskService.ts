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
        const baseFormat = 'H:mm'
        let callAt = data.call_at.trim();
        if (data.call_at.length > 1 && data.call_at[0] === '0') {
            callAt = callAt[1]
        }
        callAt = moment.tz(callAt, baseFormat, data.tz).utc().format(baseFormat)
        return Task.create({ ...data, call_at: callAt })
    }

    delete(data: IDeleteTaskRequest) {
        return Task.findByIdAndDelete(data._id)
    }


}

export default new TaskService();