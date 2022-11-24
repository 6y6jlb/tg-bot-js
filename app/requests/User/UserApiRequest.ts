import { Request } from "express";
import { isNumeric } from "../../helpers/validation";
import {Types} from "mongoose"

class UserApiRequest {
    get(request: Request) {
        const {userId} = request.query
        // if (typeof userId === Types.ObjectId ){
        //     return userId;
        // }
        throw new Error('Incorrect user id')
    }
}

export default new UserApiRequest();