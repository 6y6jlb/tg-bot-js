import { IUser } from './types';
import mongoose from "mongoose";
import crypto from 'crypto';
import { ROLE } from './const';

const User = new mongoose.Schema<IUser>({
    telegram_id: { type: Number, required: false, unique: false },
    email: { type: String, required: false, unique: false },
    created_at: { type: Date, default: Date.now },
    name: { type: String, required: false, unique: false },
    roles: { value: { type: String, enum: Object.values(ROLE) } },
    tz: { type: String, required: false },
    location: { type: String, required: false },
    currency: { type: String, required: false },
    locale: { type: String, required: false },
    hash: String,
    salt: String
})


User.pre('save', function (next) {
    if (!(this.roles && this.roles.length)) {
        this.roles = [ROLE.CUSTOMER]
    }
    if (!this.email && !this.telegram_id) {
        next(new Error('Either email or telegram_id must be set'));
    } else {
        next();
    }
});


User.methods.validatePassword = function (password: string) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};


export default mongoose.model('User', User);
