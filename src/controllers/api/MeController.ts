import { Request, Response } from "express";
import { IUser } from "../../models/types";
import UserService from "../../services/User/UserService";
import ErrorResponse from "../../services/response/ErrorResponse";


class MeController {

    async get(req: Request, res: Response) {
        try {
            console.log(req)
            //@ts-ignore
            const user: IUser = req.user;
            if (user.telegram_id || user.email) {
                res.json(await UserService.getById(Number(user.telegram_id)))

            } else {
                throw new Error('Invalid user')
            }
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

}

export default new MeController();