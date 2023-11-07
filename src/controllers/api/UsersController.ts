import { Request, Response } from "express";
import UserApiRequest from "../../requests/User/UserApiRequest";
import UserService from "../../services/User/UserService";


class UsersController {

    async login(req: Request, res: Response) {
        try {
            const data = UserApiRequest.login(req);
            const user = await UserService.login(data);
            res.json(user)
        } catch (error) {
            console.warn(error)
            res.status(400).json({ message: error.message })
        }
    }

    async get(req: Request, res: Response) {
        try {

            res.json(await UserService.get())
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const userId = req.params.userId;;

            if(userId) {
            res.json(await UserService.getById(userId))
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const data = UserApiRequest.update(req);
            res.json(await UserService.update(data))
        } catch (error: any) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }
    }
    async store(req: Request, res: Response) {
        try {
            const data = UserApiRequest.store(req);
            res.json(await UserService.store(data))
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const data = UserApiRequest.delete(req);
            res.json(await UserService.delete(data))
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }
    }

    async resetPassord(req: Request, res: Response) {
        try {
            const data = UserApiRequest.resetPassword(req);
            res.json(await UserService.resetPassword(data))
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }
    }

}

export default new UsersController();