import mongoose, { Schema } from "mongoose";
import { ITask } from './types';

const Task = new mongoose.Schema<ITask>({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    last_call: { type: Date, required: false },
    event_type: { type: Number, required: true },
    options: { type: String, required: true },
    call_at_hour: { type: Number, required: true },
    call_at_minute: { type: Number, required: true },
    tz: { type: String, required: false, default: 'Europe/Moscow' },
    is_regular: { type: Boolean, required: false, default: false },
    queue: { type: Boolean, required: false, default: false }
})

export default mongoose.model('Task', Task);
