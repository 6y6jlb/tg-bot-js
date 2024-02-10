import mongoose, { Schema } from "mongoose";
import { EVENT_ENUM } from "./const";
import { ITask } from './types';

const TaskSchema = new mongoose.Schema<ITask>({
    user_id: { type: Schema.Types.ObjectId, required: true },
    last_call: { type: Date, required: false },
    options: {
        type: [
            {
                event_type: { type: String, enum: EVENT_ENUM, required: true },
                param: { type: String }
            }
        ],
        required: true,
        default: []
    },
    call_at: { type: String, required: true },
    tz: { type: String, required: false, default: 'Europe/Moscow' },
    is_regular: { type: Boolean, required: false, default: false },
    queue: { type: Boolean, required: false, default: false },
});

export default mongoose.model<ITask>('Task', TaskSchema);

