import { Request, Response } from "express";
import UserApiRequest from "../../requests/User/UserApiRequest";
import UserService from "../../services/User/UserService";
import ErrorResponse from "../../services/response/ErrorResponse";


class AuthController {

    async login(req: Request, res: Response) {
        try {
            const data = await UserApiRequest.login(req);
            const user = await UserService.login(data);
            res.json(user)
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const data = await UserApiRequest.login(req);
            const user = await UserService.login(data);
            res.json(user)
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

    async store(req: Request, res: Response) {
        try {
            const data = await UserApiRequest.store(req);
            res.json(await UserService.store(data))
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }

    }

    async resetPassword(req: Request, res: Response) {
        try {
            const data = await UserApiRequest.resetPassword(req);
            res.json(await UserService.resetPassword(data))
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

}

export default new AuthController();