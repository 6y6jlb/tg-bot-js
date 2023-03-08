import { DeleteUserError, UserError } from './../../exceptions/User';
import { Request } from "express";
import { UpdateUserError } from "../../exceptions/User";
import { IDeleteUserRequest, IGetUserRequest, ILoginUserRequest, IStoreUserRequest, IUpdateUserRequest } from "./types";

class UserApiRequest {
    get(request: Request): ILoginUserRequest {
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
        const { user_id, name, language, currency, location, tz } = request.body
        if (user_id) {
            return { id: user_id, name, language, currency, location, tz } as IUpdateUserRequest;
        }
        throw new UpdateUserError('Incorrect data')
    }

    delete(request: Request): IDeleteUserRequest {
        const { user_id } = request.query
        if (user_id) {
            return { id: user_id } as IDeleteUserRequest;
        }
        throw new DeleteUserError('Incorrect data')
    }
}

export default new UserApiRequest();