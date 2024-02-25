import crypto from 'crypto';
import { isValidObjectId } from 'mongoose';
import { UserError } from "../../exceptions/User";
import User from "../../models/User";
import { TOKEN_TYPE, USER_ID_ENUM } from '../../models/const';
import { DeleteUserRequest, LoginUserRequest, LogoutUserPasswordRequest, ResetUserPasswordRequest, StoreUserRequest, UpdateUserRequest } from "../../requests/User/types";
import { DEFAULT_PASSWORD } from '../../utils/const';
import TokenService from '../Token/TokenService';
import { IUser } from './../../models/types';

class UsersService {
    async login(data: LoginUserRequest) {

        const { userId, idType } = this.getIdAndTypeFromData(data);
        const user = await this.getById(userId, idType) as IUser;
        if (user && typeof user.validatePassword === 'function' && user.validatePassword(data.password)) {
            return user;
        }
        throw new UserError("Wrong user credetials");
    }

    async getById(userId: any, idType = USER_ID_ENUM.MONGO_ID): Promise<IUser | undefined> {
        try {
            const doc = await User.findOne({ [idType]: userId }).exec();
            if (doc) {
                return doc as IUser;
            }
        } catch (err) {
            throw new UserError(`No user with ${idType}: ${userId}`);
        }

    }

    async get() {
        return User.find()

    }


    async update(data: UpdateUserRequest) {

        const result = { ...data } as any;
        if (data.password) {

            result['salt'] = crypto.randomBytes(16).toString('hex');

            result['hash'] = crypto.pbkdf2Sync(result.password, result['salt'], 1000, 64, `sha512`).toString(`hex`);

            delete result.password;

        }
        const { userId, idType } = this.getIdAndTypeFromData(data);
        console.log(idType)

        const user = await this.getById(userId, idType)

        if (user && typeof user.update === 'function') {
            return await user.update(data);
        }

        throw new UserError('Invalid user')
    }

    private getIdAndTypeFromData(data: { [key: string]: any }) {
        let userId = null;
        let idType = null;

        if (data.id || data._id) {
            userId = data.id || data._id;
            idType = USER_ID_ENUM.MONGO_ID;
        } else if (data.telegram_id) {
            userId = data.telegram_id;
            idType = USER_ID_ENUM.TELEGRAM_ID;
        } else if (data.email) {
            userId = data.email;
            idType = USER_ID_ENUM.EMAIL;
        }


        if (userId && idType) {
            return { userId, idType }
        }

        throw new UserError('User with this data does not exist!')
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

    async logout(data: LogoutUserPasswordRequest) {
        if (!data._id) {
            throw new UserError('Request should contain user')
        }
        await TokenService.delete({ token_type: TOKEN_TYPE.REFRESH, user_id: data._id })
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
        } as IUser

        return user;
    }

    private getUserIdTypeFromString(input: string): USER_ID_ENUM | null {
        if (/^\d+$/.test(input)) {
            return USER_ID_ENUM.TELEGRAM_ID;
        }

        if (isValidObjectId(input)) {
            return USER_ID_ENUM.MONGO_ID;
        }

        if (/^\S+@\S+\.\S+$/.test(input)) {
            return USER_ID_ENUM.EMAIL;
        }

        return null;
    }


}

export default new UsersService();