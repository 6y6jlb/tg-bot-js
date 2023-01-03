import { IUser } from './types';
import mongoose from "mongoose";

const User = new mongoose.Schema<IUser>({
    id: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    name: { type: String, required: true },
    tz: { type: String, required: false },
    location: { type: String, required: false },
    currency: { type: String, required: false },
    language: { type: String, required: false },
})

export default mongoose.model('User', User);
