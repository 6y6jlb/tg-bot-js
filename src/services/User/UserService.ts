import crypto from 'crypto';
import { UserError } from "../../exceptions/User";
import User from "../../models/User";
import { IDeleteUserRequest, ILoginUserRequest, IResetUserPasswordRequest, IStoreUserRequest, IUpdateUserRequest } from "../../requests/User/types";
import { DEFAULT_PASSWORD } from '../../utils/const';
import { IUser } from './../../models/types';

class UsersService {
    async login(data: ILoginUserRequest) {
        const user = await this.getById(data.id) as IUser;
        if (user.validatePassword(data.password)) {
            return user;
        }
        throw new UserError("Wrong Password");
    }

    getById(id: string | number) {
        if (id) {
            return User.findOne({id})
        } else {
            throw new UserError('No user');
        }

    }

    get() {
        return User.find()

    }


    update(data: IUpdateUserRequest) {

        if (data.password) {

            data['salt'] = crypto.randomBytes(16).toString('hex');

            data['hash'] = crypto.pbkdf2Sync(data.password, data['salt'], 1000, 64, `sha512`).toString(`hex`);

            delete data.password;

        }

        return User.findOneAndUpdate({id: data.id}, data, {new: true});
    }

    store(data: IStoreUserRequest) {


        return User.create({ ...data, ...this.getDefaultPassword() })
    }

    delete(data: IDeleteUserRequest) {
        return User.findOneAndDelete(data)
    }

    resetPassword(data: IResetUserPasswordRequest) {
        return User.findOneAndUpdate({ ...data, ...this.getDefaultPassword() });
    }

    getDefaultPassword() {

        const salt = crypto.randomBytes(16).toString('hex');

        const hash = crypto.pbkdf2Sync(DEFAULT_PASSWORD, salt, 1000, 64, `sha512`).toString(`hex`);

        return { salt, hash }
    }


}

export default new UsersService();