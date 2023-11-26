import mongoose from "mongoose";
import { ITask } from './types';

const Task = new mongoose.Schema<ITask>({
    user_id: { type: Number || String, required: true },
    last_call: { type: Date, required: false },
    options: { type: [], required: true, default: [] },
    call_at: { type: String, required: true },
    tz: { type: String, required: false, default: 'Europe/Moscow' },
    is_regular: { type: Boolean, required: false, default: false },
    queue: { type: Boolean, required: false, default: false },
})

export default mongoose.model('Task', Task);
