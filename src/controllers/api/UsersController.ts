import { Request, Response } from "express";
import UserApiRequest from "../../requests/User/UserApiRequest";
import UserService from "../../services/User/UserService";
import ErrorResponse from "../../services/response/ErrorResponse";


class UsersController {

    async get(req: Request, res: Response) {
        try {
            res.json(await UserService.get())
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