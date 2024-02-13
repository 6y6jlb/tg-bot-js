import { Schema } from "mongoose";
import { TOKEN_TYPE } from "../../models/const";

type CommonTokenRequest = {
    user_id: Schema.Types.ObjectId;
    token_type: TOKEN_TYPE;
}

export type StoreTokenRequest = CommonTokenRequest & {
    token: string
}

export type DeleteTokenRequest = CommonTokenRequest & {}

export type GetTokenRequest = CommonTokenRequest & {}

export type RefreshTokenRequest = {
    refresh_token: string
}


