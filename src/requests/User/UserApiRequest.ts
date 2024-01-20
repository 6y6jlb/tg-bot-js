import { Request } from "express";
import { UpdateUserSchema, deleteUserSchema, loginUserSchema, logoutUserPasswordSchema, resetUserPasswordSchema, storeUserSchema } from './schema';
import { DeleteUserRequest, LoginUserRequest, ResetUserPasswordRequest, StoreUserRequest, UpdateUserRequest } from "./types";

class UserApiRequest {

    async login(request: Request): Promise<LoginUserRequest> {
        return await loginUserSchema.validateAsync(request.body);
    }

    async store(request: Request): Promise<StoreUserRequest> {
        return await storeUserSchema.validateAsync(request.body);
    }

    async update(request: Request): Promise<UpdateUserRequest> {
        return await UpdateUserSchema.validateAsync(request.body);
    }

    async delete(request: Request): Promise<DeleteUserRequest> {
        return await deleteUserSchema.validateAsync(request.query);
    }

    async resetPassword(request: Request): Promise<ResetUserPasswordRequest> {
        return await resetUserPasswordSchema.validateAsync(request.query);
    }

    async logout(request: Request): Promise<ResetUserPasswordRequest> {
        return await logoutUserPasswordSchema.validateAsync(request.query);
    }
}

export default new UserApiRequest();