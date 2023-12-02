import crypto from 'crypto';
import { GetUserError, UserError } from "../../exceptions/User";
import User from "../../models/User";
import { DeleteUserRequest, LoginUserRequest, ResetUserPasswordRequest, StoreUserRequest, UpdateUserRequest, UserConditionalCredetial } from "../../requests/User/types";
import { DEFAULT_PASSWORD } from '../../utils/const';
import { IUser } from './../../models/types';

class UsersService {
    async login(data: LoginUserRequest) {
        const user = await this.getById(data.telegram_id || data.email) as IUser;
        if (user && typeof user.validatePassword === 'function' && user.validatePassword(data.password)) {
            return user;
        }
        throw new UserError("Wrong Password");
    }

    async getById(user_id?: string | number): Promise<IUser | null> {
        const idKeys = ['telegram_id', 'email'];
        let mongo_id = null;

        for (const key of idKeys) {
            try {
                const doc = await User.findOne({ [key]: user_id }).exec();
                if (doc) {
                    mongo_id = doc._id;
                    break;
                }
            } catch (err) {
                console.log(err);
            }
        }

        if (mongo_id) {
            return await User.findById(mongo_id)
        } else {
            throw new GetUserError('No user with this id');
        }

    }

    get() {
        return User.find()

    }


    async update(data: UpdateUserRequest) {

        const result = { ...data } as any;
        if (data.password) {

            result['salt'] = crypto.randomBytes(16).toString('hex');

            result['hash'] = crypto.pbkdf2Sync(result.password, result['salt'], 1000, 64, `sha512`).toString(`hex`);

            delete result.password;

        }

        const user = await this.getById(data.telegram_id || data.email)

        if (user && typeof user.update === 'function') {
            return await user.update(data, { new: true });
        }

        return null
    }

    async store(data: StoreUserRequest) {
        return await User.create(this.getUserTemplate(data))
    }

    delete(data: DeleteUserRequest) {
        return User.findOneAndDelete(data)
    }

    resetPassword(data: ResetUserPasswordRequest) {
        return User.findOneAndUpdate({ ...data, ...this.getPasswordData() });
    }

    getPasswordData(password?: string) {

        const salt = crypto.randomBytes(16).toString('hex');

        const hash = crypto.pbkdf2Sync(password || DEFAULT_PASSWORD, salt, 1000, 64, `sha512`).toString(`hex`);

        return { salt, hash }
    }

    getUserTemplate(data: StoreUserRequest) {
        const preparedData = { ...data }
        const passwordData = this.getPasswordData(data.password);
        delete preparedData.password

        const user: IUser = {
            currency: 'USD',
            locale: 'en',
            created_at: new Date(),
            ...preparedData,
            ...passwordData
        }

        return user;
    }


}

export default new UsersService();