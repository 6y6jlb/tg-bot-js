import { Request } from "express";
import { UpdateUserError } from "../../exceptions/User";
import { DeleteUserError, UserError } from './../../exceptions/User';
import { loginSchema, registerSchema } from './schema';
import { IDeleteUserRequest, IGetUserRequest, ILoginUserRequest, IResetUserPasswordRequest, IStoreUserRequest, IUpdateUserRequest } from "./types";

class UserApiRequest {

    getById(request: Request): IGetUserRequest {
        const { id } = request.query
        if (id) {
            return { id } as IGetUserRequest;
        }
        throw new UserError('User validation error')
    }

    async login(request: Request): Promise<ILoginUserRequest> {
        await loginSchema.validateAsync(request.body);
        return { id: request.body.user_id, password: request.body.password }
    }

    async store(request: Request): Promise<IStoreUserRequest> {
        await registerSchema.validateAsync(request.body);
        return { name: request.body.name, locale: request.body.locale, currency: request.body.currency, location: request.body.location, tz: request.body.tz };
    }

    update(request: Request): IUpdateUserRequest {
        const { user_id, name, locale, currency, location, tz, password } = request.body
        if (user_id) {
            return { id: user_id, name, locale, currency, location, tz, password } as IUpdateUserRequest;
        }
        throw new UpdateUserError('Incorrect data')
    }

    delete(request: Request): IDeleteUserRequest {
        const { id } = request.query
        if (id) {
            return { id } as IDeleteUserRequest;
        }
        throw new DeleteUserError('Incorrect data')
    }

    resetPassword(request: Request): IResetUserPasswordRequest {
        const { id } = request.query
        if (id) {
            return { id } as IResetUserPasswordRequest;
        }
        throw new UserError('Has not user id')
    }
}

export default new UserApiRequest();