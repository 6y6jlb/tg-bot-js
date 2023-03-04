import mongoose from "mongoose";
import { APP_TYPE_ENUM, IUserSettings } from './types';

const UserSettings = new mongoose.Schema<IUserSettings>({
    user_id: { type: Number, ref: 'User' },
    app_type: { type: Number, required: true, default: APP_TYPE_ENUM.DEFAULT },
    payload: { type: Object, required: false},
    created_at: { type: Date, required: true },
})

export default mongoose.model('UserSettings', UserSettings);
