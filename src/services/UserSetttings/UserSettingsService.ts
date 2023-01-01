import UserSettings from "../../models/UserSettings";
import { IDeleteUserSettingsRequest, IGetUserSettingsRequest, IUpdateUserSettingsRequest } from './../../requests/UserSettings/types';

class UsersService {

    async get(data: IGetUserSettingsRequest) {
        if (data._id || data.user_id) {
            return await UserSettings.findOne(data)
        } else {
            return await UserSettings.find({})
        }

    }

    async update(data: IUpdateUserSettingsRequest) {
        return await UserSettings.findOneAndUpdate(data);;
    }

    async store(data: IGetUserSettingsRequest) {
        return await UserSettings.create(data)
    }

    async delete(data: IDeleteUserSettingsRequest) {
        return await UserSettings.findOneAndDelete(data)
    }

    async updateOrCreate(data: IUpdateUserSettingsRequest) {
        const existedUserSettings = await this.getExisterUserSettings(data.user_id);
        if(existedUserSettings) {
            return await this.update(data);
        }
        return await this.store(data);
    }

    async getExisterUserSettings(userId: Number) {
        return await UserSettings.exists({ user_id: userId })
    }



}

export default new UsersService();