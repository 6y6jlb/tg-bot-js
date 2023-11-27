import crypto from 'crypto';
import { GetUserError, UserError } from "../../exceptions/User";
import User from "../../models/User";
import { DeleteUserRequest, LoginUserRequest, ResetUserPasswordRequest, StoreUserRequest, UpdateUserRequest, UserConditionalCredetial } from "../../requests/User/types";
import { DEFAULT_PASSWORD } from '../../utils/const';
import { IUser } from './../../models/types';

class UsersService {
    async login(data: LoginUserRequest) {
        const user = await this.getById(data.telegram_id || data.email) as IUser;
        if (user.validatePassword(data.password)) {
            return user;
        }
        throw new UserError("Wrong Password");
    }

    async getById(user_id: string | number) {
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

        if (data.password) {

            data['salt'] = crypto.randomBytes(16).toString('hex');

            data['hash'] = crypto.pbkdf2Sync(data.password, data['salt'], 1000, 64, `sha512`).toString(`hex`);

            delete data.password;

        }

        return (await this.getById(data.telegram_id || data.email)).update(data, { new: true })
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