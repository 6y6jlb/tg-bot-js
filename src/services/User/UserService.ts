import { IUser } from './../../models/types';
import { UserError } from "../../exceptions/User";
import User from "../../models/User";
import crypto from 'crypto';
import { IGetUserRequest, IUpdateUserRequest, IDeleteUserRequest, IStoreUserRequest, ILoginUserRequest } from "../../requests/User/types";
import { DEFAULT_PASSWORD } from '../../utils/const';

class UsersService {
    async login(data: ILoginUserRequest) {
        const user = await this.get({ id: data.id }) as IUser;
        if (user.validatePassword(data.password)) {
            return user;
        }
        throw new UserError("Wrong Password");
    }

    get(data: IGetUserRequest) {
        if (data.id) {
            return User.findOne(data)
        } else {
            throw new UserError('No user');
        }

    }

    update(data: IUpdateUserRequest) {
        return User.findOneAndUpdate(data);
    }

    store(data: IStoreUserRequest) {

    const salt = crypto.randomBytes(16).toString('hex');

    const hash = crypto.pbkdf2Sync(DEFAULT_PASSWORD, salt,
        1000, 64, `sha512`).toString(`hex`);

        return User.create({...data, salt, hash})
    }

    delete(data: IDeleteUserRequest) {
        return User.findOneAndDelete(data)
    }
    async isUserExists(userId: number) {
        return await User.exists({ id: userId })
    }


}

export default new UsersService();