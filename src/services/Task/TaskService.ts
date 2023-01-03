import Task from "../../models/Task";
import { IDeleteTaskRequest,IGetTaskRequest,IStoreTaskRequest,IUpdateTaskRequest } from "../../requests/Task/types";

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
        return Task.create(data)
    }

    delete(data: IDeleteTaskRequest) {
        return Task.findByIdAndDelete(data._id)
    }


}

export default new TaskService();