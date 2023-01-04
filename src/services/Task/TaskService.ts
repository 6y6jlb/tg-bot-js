import moment from "moment-timezone";
import Task from "../../models/Task";
import { IDeleteTaskRequest, IGetTaskRequest, IStoreTaskRequest, IUpdateTaskRequest } from "../../requests/Task/types";

class TaskService {
    FORMAT: string;
    constructor() {
        this.FORMAT = 'H:mm';
    }

    get(data: IGetTaskRequest) {
        if (data._id) {
            return Task.findOne(data)
        } else {
            return Task.find(data)
        }

    }

    update(data: IUpdateTaskRequest) {
        return Task.findByIdAndUpdate(data._id, data.payload);
    }

    store(data: IStoreTaskRequest) {
        let callAt = this.timeCorrection(data.call_at)
        callAt = moment.tz(callAt, this.FORMAT, data.tz).utc().format(this.FORMAT)
        return Task.create({ ...data, call_at: callAt })
    }

    delete(data: IDeleteTaskRequest) {
        return Task.findByIdAndDelete(data._id)
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