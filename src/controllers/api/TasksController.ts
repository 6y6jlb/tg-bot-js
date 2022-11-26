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
            res.json(error)
        }
    }
    async update(req: Request, res: Response) {
        try {
            const data = TaskApiRequest.update(req);
            res.json(await TaskService.update(data))
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    }
    async store(req: Request, res: Response) {
        try {
            const data = TaskApiRequest.store(req);
            res.json(await TaskService.store(data))
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const data = TaskApiRequest.delete(req);
            res.json(await TaskService.delete(data))
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    }

}

export default new TasksController();