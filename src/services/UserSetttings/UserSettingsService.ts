import { APP_TYPE_ENUM } from "../../models/types";
import UserSettings from "../../models/UserSettings";
import { IDeleteUserSettingsRequest, IGetUserSettingsRequest, IStoreUserSettingsRequest, IUpdateUserSettingsRequest } from './../../requests/UserSettings/types';

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

    store(data: IStoreUserSettingsRequest) {
        return UserSettings.create(data)
    }

    delete(data: IDeleteUserSettingsRequest) {
        return UserSettings.findOneAndDelete(data)
    }


}

export default new UsersService();