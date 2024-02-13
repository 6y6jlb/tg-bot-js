import { UserSettingsError } from '../../exceptions/UserSettings';
import { IDeleteUserSettingsRequest, IGetUserSettingsRequest, IStoreUserSettingsRequest, IUpdateUserSettingsRequest } from "./types";

class UserTgRequest {
    get(request: any): IGetUserSettingsRequest {
        const { id } = request
        if (id) {
            return { _id: id } as IGetUserSettingsRequest;
        }
        return {}
    }

    store(request: any): IStoreUserSettingsRequest {
        const { user_id, app_type } = request
        return { user_id, app_type } as IStoreUserSettingsRequest;
    }

    update(request: any): IUpdateUserSettingsRequest {
        const { id, user_id, app_type } = request
        if (id || user_id) {
            return { _id: id, user_id, app_type } as IUpdateUserSettingsRequest;
        }
        throw new UserSettingsError('Incorrect data for update')
    }

    delete(request: any): IDeleteUserSettingsRequest {
        const { user_id } = request
        if (user_id) {
            return { id: user_id } as IDeleteUserSettingsRequest;
        }
        throw new UserSettingsError('Incorrect data for deletion')
    }
}

export default new UserTgRequest();