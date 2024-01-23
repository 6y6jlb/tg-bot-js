import { Request } from "express";
import { UpdateMeSchema } from './schema';
import { UpdateUserRequest } from "../User/types";


class MeApiRequest {

    async update(request: Request): Promise<UpdateUserRequest> {
        return await UpdateMeSchema.validateAsync(request.body);
    }
}

export default new MeApiRequest();