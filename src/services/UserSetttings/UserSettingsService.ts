import { Schema } from 'mongoose';
import UserSettings from "../../models/UserSettings";
import { IUserSettings } from './../../models/types';
import { IDeleteUserSettingsRequest, IGetUserSettingsRequest, IStoreUserSettingsRequest, IUpdateUserSettingsRequest } from './../../requests/UserSettings/types';
import { UserSettingsError } from '../../exceptions/UserSettings';

class UsersService {

    async get(data: IGetUserSettingsRequest) {
        if (data._id || data.user_id) {
            return await UserSettings.findOne(data) as IUserSettings
        }
        throw new UserSettingsError('Incorrect data: ' + JSON.stringify(data))

    }

    async update(data: IUpdateUserSettingsRequest) {
        return await UserSettings.findOneAndUpdate(data);;
    }

    async store(data: IStoreUserSettingsRequest) {
        return await UserSettings.create(data)
    }

    async delete(data: IDeleteUserSettingsRequest) {
        return await UserSettings.findOneAndDelete(data)
    }

    async updateOrCreate(data: IUpdateUserSettingsRequest) {
        const existedUserSettings = await this.getExisterUserSettings(data.user_id);
        if (existedUserSettings) {
            return await this.update(data);
        }
        return await this.store(data);
    }

    async getExisterUserSettings(user_id: Schema.Types.ObjectId) {
        return await UserSettings.exists({ user_id })
    }



}

export default new UsersService();