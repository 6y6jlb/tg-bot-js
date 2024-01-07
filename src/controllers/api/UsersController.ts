import { Request, Response } from "express";
import { IUser } from "../../models/types";
import UserApiRequest from "../../requests/User/UserApiRequest";
import AdminService from "../../services/Admin/AdminService";
import UserService from "../../services/User/UserService";
import ErrorResponse from "../../services/response/ErrorResponse";


class UsersController {

    async get(req: Request, res: Response) {
        try {
            //@ts-ignore
            const user: IUser = req.user;
            if (user.telegram_id || user.email) {
                if (AdminService.checkAdmin(Number(user.telegram_id))) {
                    res.json(await UserService.get())
                } else {
                    res.json(await UserService.getById(Number(user.telegram_id)))
                }

            } else {
                throw new Error('Invalid user')
            }
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const userId = req.params.userId;;

            if (userId) {
                res.json(await UserService.getById(userId))
            }
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

    async update(req: Request, res: Response) {
        try {
            const data = await UserApiRequest.update(req);
            res.json(await UserService.update(data))
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const data = await UserApiRequest.delete(req);
            res.json(await UserService.delete(data))
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

}

export default new UsersController();