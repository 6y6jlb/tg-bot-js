import { Request } from "express";
import { deleteSchema, getSchema, refreshSchema, storeSchema } from './schema';
import { DeleteTokenRequest, GetTokenRequest, RefreshTokenRequest, StoreTokenRequest } from "./types";


class TokenRequest {

    async get(request: Request): Promise<GetTokenRequest> {
        return await getSchema.validateAsync(request.body);
    }

    async refresh(request: Request): Promise<RefreshTokenRequest> {
        return await refreshSchema.validateAsync(request.body);
    }

    async store(request: Request): Promise<StoreTokenRequest> {
        return await storeSchema.validateAsync(request.body);
    }

    async delete(request: Request): Promise<DeleteTokenRequest> {
        return await deleteSchema.validateAsync(request.query);
    }

}

export default new TokenRequest();