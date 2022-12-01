import { Request, Response } from "express";
import UserApiRequest from "../../requests/User/UserApiRequest";
import UserService from "../../services/User/UserService";


class UsersController {
    async get(req: Request, res: Response) {
        try {
            const data = UserApiRequest.get(req);
            res.json(await UserService.get(data))
        } catch (error) {
            console.log(error)
            res.status(400).json(error.message)
        }
    }
    async update(req: Request, res: Response) {
        try {
            const data = UserApiRequest.update(req);
            res.json(await UserService.update(data))
        } catch (error: any) {
            console.log(error)
            res.status(400).json(error.message)
            res.json(error.message)
        }
    }
    async store(req: Request, res: Response) {
        try {
            const data = UserApiRequest.store(req);
            res.json(await UserService.store(data))
        } catch (error) {
            console.log(error)
            res.status(400).json(error.message)
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const data = UserApiRequest.delete(req);
            res.json(await UserService.delete(data))
        } catch (error) {
            console.log(error)
            res.status(400).json(error.message)
        }
    }

}

export default new UsersController();