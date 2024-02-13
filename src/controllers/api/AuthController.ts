import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserApiRequest from "../../requests/User/UserApiRequest";
import UserService from "../../services/User/UserService";
import ErrorResponse from "../../services/response/ErrorResponse";
import config from "../../utils/config";
import TokenService from "../../services/Token/TokenService";
import { TOKEN_TYPE } from "../../models/const";
import TokenRequest from "../../requests/Token/TokenRequest";


class AuthController {

    async login(req: Request, res: Response) {
        try {
            const data = await UserApiRequest.login(req);
            const user = await UserService.login(data);
            //@ts-ignore
            const acessToken = jwt.sign({ ...user._doc ?? {} }, config.JWT_SECRET_KEY, { expiresIn: '5m' })
            const refreshToken = jwt.sign({ user_id: user._id, token_type: TOKEN_TYPE.REFRESH }, config.JWT_SECRET_REFRESH_KEY, { expiresIn: '7d' });
            await TokenService.store({ user_id: user._id, token_type: TOKEN_TYPE.REFRESH, token: refreshToken })
            res.json({ access_token: acessToken, refresh_token: refreshToken })
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {

            const { refresh_token } = await TokenRequest.refresh(req);

            const decoded = jwt.verify(refresh_token, config.JWT_SECRET_REFRESH_KEY);

            //@ts-ignore
            const storedRefreshToken = await TokenService.get({ ...decoded, token: refresh_token })
            console.log(storedRefreshToken)
            if (!storedRefreshToken) {
                throw new Error('Invalid refresh token');
            }

            //@ts-ignore
            const user = await UserService.getById(decoded.user_id);

            //@ts-ignore
            const accessToken = jwt.sign({ ...user._doc ?? {} }, config.JWT_SECRET_KEY, { expiresIn: '5m' });

            res.json({ access_token: accessToken });
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json();
        }
    }

    async logout(req: Request, res: Response) {
        try {
            //@ts-ignore
            const user: IUser = req.user;
            if (user._id) {
                await UserService.logout({ _id: user._id });
            }

            res.json().status(200)
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