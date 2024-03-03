import { Request, Response } from "express";
import { UserError } from "../../exceptions/User";
import { USER_ID_ENUM } from "../../models/const";
import { IUser } from "../../models/types";
import MeApiRequest from "../../requests/Me/MeApiRequest";
import UserService from "../../services/User/UserService";
import ErrorResponse from "../../services/response/ErrorResponse";


class MeController {

    async get(req: Request, res: Response) {
        try {
            //@ts-ignore
            const user: IUser = req.user;
            if (user.telegram_id || user.email) {
                const me = await UserService.getById(user.telegram_id, USER_ID_ENUM.TELEGRAM_ID)
                res.json(me ? {
                    _id: me._id,
                    telegram_id: me.telegram_id,
                    email: me.email,
                    created_at: me.created_at,
                    name: me.name,
                    roles: me.roles,
                    tz: me.tz,
                    location: me.location,
                    currency: me.currency,
                    locale: me.locale,
                } : null)

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