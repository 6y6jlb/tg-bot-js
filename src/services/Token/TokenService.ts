import { TokenError } from '../../exceptions/Token';
import Token from '../../models/Token';
import { DeleteTokenRequest, GetTokenRequest, StoreTokenRequest } from '../../requests/Token/types';

class TokenService {

    async get(data: GetTokenRequest) {
        if (data.user_id && data.token_type) {
            return await Token.findOne(data)
        }
        throw new TokenError('Token can not be find, data incorrect: ' + JSON.stringify(data))
    }

    async store(data: StoreTokenRequest) {
        if (data.user_id && data.token_type) {
            await this.delete({ user_id: data.user_id, token_type: data.token_type })
            return await Token.create(data)
        }
        throw new TokenError('Token can not be stored, data incorrect: ' + JSON.stringify(data))
    }

    async delete(data: DeleteTokenRequest) {
        if (data.user_id && data.token_type) {
            return await Token.findOneAndDelete(data)
        }
        throw new TokenError('Token can not be removed, data incorrect: ' + JSON.stringify(data))
    }
}

export default new TokenService();