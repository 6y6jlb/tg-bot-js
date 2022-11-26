import { Request, Response } from "express";
import UserApiRequest from "../../requests/User/UserApiRequest";
import UserService from "../../services/User/UserService";
import User from "../../models/User";


class UsersController {
    async get(req: Request, res: Response) {
        try {
            const data = UserApiRequest.get(req);
            res.json(await UserService.get(data))
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    }
    async update(req: Request, res: Response) {
        try {
            const data = UserApiRequest.update(req);
            res.json(await UserService.update(data))
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    }
    async store(req: Request, res: Response) {
        try {
            const data = UserApiRequest.store(req);
            res.json(await UserService.store(data))
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const data = UserApiRequest.delete(req);
            res.json(await UserService.delete(data))
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    }

}

export default new UsersController();