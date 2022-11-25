import User from "../../models/User";
import { IGetUserRequest, IUpdateUserRequest, IDeleteUserRequest, IStoreUserRequest } from "../../requests/User/types";

class UsersService {

    get(data: IGetUserRequest) {
        if (data._id) {
            return User.findOne(data)
        } else {
            return User.find({})
        }

    }

    update(data: IUpdateUserRequest) {
        return User.findByIdAndUpdate(data);
    }

    store(data: IStoreUserRequest) {
        return User.create(data)
    }

    delete(data: IDeleteUserRequest) {
        return User.findByIdAndDelete(data._id)
    }


}

export default new UsersService();