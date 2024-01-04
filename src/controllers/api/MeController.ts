import { Request, Response } from "express";
import { IUser } from "../../models/types";
import UserService from "../../services/User/UserService";
import ErrorResponse from "../../services/response/ErrorResponse";


class MeController {

    async get(req: Request, res: Response) {
        try {

            //@ts-ignore
            const user: IUser = req.user;
            if (!(user.telegram_id && user.email)) {
                throw new Error('Invalid user')
            }

            res.json(await UserService.getById(Number(user.telegram_id)))
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

}

export default new MeController();