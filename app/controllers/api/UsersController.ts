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
    update(req: Request, res: Response) {
        try {

        } catch (error) {

        }
    }
    store(req: Request, res: Response) {
        try {

        } catch (error) {

        }
    }
    delete(req: Request, res: Response) {
        try {

        } catch (error) {

        }
    }

}

export default new UsersController();