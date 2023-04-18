import { Request, Response } from "express";
import TaskApiRequest from "../../requests/Task/TaskApiRequest";
import TaskService from "../../services/Task/TaskService";


class TasksController {
    async get(req: Request, res: Response) {
        try {
            const data = TaskApiRequest.get(req);
            res.json(await TaskService.get(data))
        } catch (error) {
            console.log(error)
            res.json(error.message)
        }
    }
    async update(req: Request, res: Response) {
        try {
            const data = TaskApiRequest.update(req);
            const task = await TaskService.update(data);
            res.json(task)
        } catch (error) {
            console.log(error)
            res.json(error.message)
        }
    }
    async store(req: Request, res: Response) {
        try {
            const data = TaskApiRequest.store(req);
            res.json(await TaskService.store(data))
        } catch (error) {
            console.log(error)
            res.json(error.message)
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const data = TaskApiRequest.delete(req);
            res.json(await TaskService.delete(data))
        } catch (error) {
            console.log(error)
            res.json(error.message)
        }
    }

}

export default new TasksController();