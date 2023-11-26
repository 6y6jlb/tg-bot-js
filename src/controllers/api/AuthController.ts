import { Request, Response } from "express";
import UserApiRequest from "../../requests/User/UserApiRequest";
import UserService from "../../services/User/UserService";


class AuthController {

    async login(req: Request, res: Response) {
        try {
            const data = await UserApiRequest.login(req);
            const user = await UserService.login(data);
            res.json(user)
        } catch (error) {
            console.warn(error)
            res.status(400).json({ message: error.message })
        }
    }
    async logout(req: Request, res: Response) {
        try {
            const data = await UserApiRequest.login(req);
            const user = await UserService.login(data);
            res.json(user)
        } catch (error) {
            console.warn(error)
            res.status(400).json({ message: error.message })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const data = await UserApiRequest.store(req);
            res.json(await UserService.store(data))
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }

    }

    async resetPassword(req: Request, res: Response) {
        try {
            const data = await UserApiRequest.resetPassword(req);
            res.json(await UserService.resetPassword(data))
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }
    }

}

export default new AuthController();