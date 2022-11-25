import User from "../../models/User";
import { IUserGetRequest } from "../../requests/User/types";

class UsersService {

    get(data?: IUserGetRequest) {
        if (data?.user_id) {
            return User.findOne(data)
        } else {
            return User.find({})
        }

    }

    update(userId?: string) {

    }

    store(userId?: string) {

    }

    delete(userId?: string) {

    }


}

export default new UsersService();