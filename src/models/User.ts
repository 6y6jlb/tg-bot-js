import { IUser } from './types';
import mongoose from "mongoose";

const User = new mongoose.Schema<IUser>({
    id: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    name: { type: String, required: true },
    tz: { type: String, required: false },
    location: { type: String, required: false },
    currency: { type: String, required: false },
    language: { type: String, required: false },
    mess_count: { type: Number, required: false, default: 1 }
})

export default mongoose.model('User', User);
