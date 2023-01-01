import UserSettings from "../../models/UserSettings";
import { IDeleteUserSettingsRequest, IGetUserSettingsRequest, IUpdateUserSettingsRequest } from './../../requests/UserSettings/types';

class UsersService {

    get(data: IGetUserSettingsRequest) {
        if (data._id || data.user_id) {
            return UserSettings.findOne(data)
        } else {
            return UserSettings.find({})
        }

    }

    update(data: IUpdateUserSettingsRequest) {
        return UserSettings.findOneAndUpdate(data);
    }

    store(data: IGetUserSettingsRequest) {
        return UserSettings.create(data)
    }

    delete(data: IDeleteUserSettingsRequest) {
        return UserSettings.findOneAndDelete(data)
    }

    async updateOrCreate(data: IUpdateUserSettingsRequest) {
        const existedUser = await this.getExisterUserSettings(data.user_id);
        if(existedUser) {
            return this.update(data);
        }
        return this.store(data);
    }

    async getExisterUserSettings(userId: Number) {
        return await UserSettings.exists({ user_id: userId })
    }



}

export default new UsersService();