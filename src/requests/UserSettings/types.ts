import { IUserSettings } from './../../models/types';
export interface IGetUserSettingsRequest {
    _id?: string,
    user_id?: Number,
}

export interface IStoreUserSettingsRequest extends IUserSettings {
}

export interface IUpdateUserSettingsRequest extends IUserSettings {
}

export interface IDeleteUserSettingsRequest {
    _id?: string
}