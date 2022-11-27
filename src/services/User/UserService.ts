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
    isUserExists(userId: number) {
        return User.exists({ id: userId }, function (err, doc) {
            if (err) {
                return false
            } else {
                return doc
            }
        })
    }


}

export default new UsersService();