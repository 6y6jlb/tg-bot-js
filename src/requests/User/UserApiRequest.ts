import { Request } from "express";
import { IDeleteUserRequest, IGetUserRequest, IStoreUserRequest, IUpdateUserRequest } from "./types";

class UserApiRequest {
    get(request: Request): IGetUserRequest {
        const { user_id } = request.query
        if (user_id) {
            return { id: user_id } as IGetUserRequest;
        }
        return {}
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
        throw new Error('Incorrect data')
    }

    delete(request: Request): IDeleteUserRequest {
        const { user_id } = request.query
        if (user_id) {
            return { id: user_id } as IDeleteUserRequest;
        }
        throw new Error('Incorrect data')
    }
}

export default new UserApiRequest();