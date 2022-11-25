import { Request } from "express";
import { IUserGetRequest } from "./types";

class UserApiRequest {
    get(request: Request): IUserGetRequest {
        const { user_id } = request.query
        if (user_id) {
            return {user_id: user_id as string};
        }
        return {}
    }
}

export default new UserApiRequest();