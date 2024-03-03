import { Request, Response } from "express";
import { UserError } from "../../exceptions/User";
import { USER_ID_ENUM } from "../../models/const";
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
                if (await AdminService.checkAdmin(Number(user.telegram_id))) {
                    res.json((await UserService.get()).map(u => ({
                        _id: u._id,
                        telegram_id: u.telegram_id,
                        email: u.email,
                        created_at: u.created_at,
                        mame: u.name,
                        roles: u.roles,
                        tz: u.tz,
                        location: u.location,
                        locale: u.locale,
                        currency: u.currency,
                    })))
                } else {
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
                }

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
            if (user._id || await AdminService.checkAdmin(Number(user.telegram_id))) {
                const data = await UserApiRequest.update(req);
                await UserService.update({ ...data, _id: user._id })
                res.json().status(200)

            } else {
                throw new UserError('Invalid user')
            }
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

    async delete(req: Request, res: Response) {
        try {
            //@ts-ignore
            const user: IUser = req.user;
            if (user._id || await AdminService.checkAdmin(Number(user.telegram_id))) {
                const data = await UserApiRequest.delete(req);
                res.json(await UserService.delete(data))
            } else {
                throw new UserError('Invalid user')
            }

        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

}

export default new UsersController();