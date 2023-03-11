import { DeleteUserError, UserError } from './../../exceptions/User';
import { Request } from "express";
import { UpdateUserError } from "../../exceptions/User";
import { IDeleteUserRequest, IGetUserRequest, ILoginUserRequest, IResetUserPasswordRequest, IStoreUserRequest, IUpdateUserRequest } from "./types";

class UserApiRequest {

    getById(request: Request): IGetUserRequest {
        const { id } = request.query
        if (id) {
            return { id } as IGetUserRequest;
        }
        throw new UserError('User validation error')
    }

    login(request: Request): ILoginUserRequest {
        const { user_id, password } = request.query
        if (user_id && password) {
            return { id: user_id, password } as ILoginUserRequest;
        }
        throw new UserError('User validation error')
    }

    store(request: Request): IStoreUserRequest {
        const { name, language, currency, location, tz } = request.body
        return { name, language, currency, location, tz } as IStoreUserRequest;
    }

    update(request: Request): IUpdateUserRequest {
        const { user_id, name, language, currency, location, tz, password } = request.body
        if (user_id) {
            return { id: user_id, name, language, currency, location, tz, password } as IUpdateUserRequest;
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