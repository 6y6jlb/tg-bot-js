import mongoose from "mongoose";
import { IUserSettings } from './types';

const UserSetttings = new mongoose.Schema<IUserSettings>({
    user_id: { type: Number, ref: 'User' },
    app_type: { type: Number, required: true },
    created_at: { type: Date, required: true },
})

export default mongoose.model('UserSetttings', UserSetttings);
