import { IUser } from './types';
import mongoose from "mongoose";
import crypto from 'crypto';

const User = new mongoose.Schema<IUser>({
    id: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    name: { type: String, required: true },
    tz: { type: String, required: false },
    location: { type: String, required: false },
    currency: { type: String, required: false },
    language: { type: String, required: false },
    hash: String,
    salt: String
})

User.methods.setPassword = function (password: string) {

    // Creating a unique salt for a particular user
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations,
    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
};

User.methods.validatePassword = function (password: string) {
    const hash = crypto.pbkdf2Sync(password,this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};


export default mongoose.model('User', User);
