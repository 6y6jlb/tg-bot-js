import { Request, Response } from "express";
import { IUser } from "../../models/types";
import UserService from "../../services/User/UserService";
import ErrorResponse from "../../services/response/ErrorResponse";
import { USER_ID_ENUM } from "../../models/const";
import UserApiRequest from "../../requests/User/UserApiRequest";
import MeApiRequest from "../../requests/Me/MeApiRequest";
import { UserError } from "../../exceptions/User";


class MeController {

    async get(req: Request, res: Response) {
        try {
            //@ts-ignore
            const user: IUser = req.user;
            if (user.telegram_id || user.email) {
                res.json(await UserService.getById(user.telegram_id, USER_ID_ENUM.TELEGRAM_ID))

            } else {
                throw new Error('Invalid user')
            }
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

    async update(req: Request, res: Response) {
        try {
            //@ts-ignore
            const user: IUser = req.user;
            if (user._id) {
                const data = await MeApiRequest.update(req);
                await UserService.update({ ...data, _id: user._id })
                res.json().status(200)

            } else {
                throw new UserError('Invalid user')
            }

        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

}

export default new MeController();