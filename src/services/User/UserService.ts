import User from "../../models/User";
import { IGetUserRequest, IUpdateUserRequest, IDeleteUserRequest, IStoreUserRequest } from "../../requests/User/types";

class UsersService {

    get(data: IGetUserRequest) {
        if (data.id) {
            return User.findOne(data)
        } else {
            return User.find({})
        }

    }

    update(data: IUpdateUserRequest) {
        return User.findOneAndUpdate(data);
    }

    store(data: IStoreUserRequest) {
        return User.create(data)
    }

    delete(data: IDeleteUserRequest) {
        return User.findOneAndDelete(data)
    }
    async isUserExists(userId: number) {
        return await User.exists({ id: userId })
    }


}

export default new UsersService();