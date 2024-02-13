import mongoose, { Schema } from "mongoose";
import { TOKEN_TYPE } from './const';
import { IToken } from './types';

const Token = new mongoose.Schema<IToken>({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    token_type: { type: String, required: true, default: TOKEN_TYPE.REFRESH }
})


export default mongoose.model('Token', Token);
