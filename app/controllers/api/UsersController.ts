import { Request, Response } from "express";
import UserApiRequest from "../../requests/User/UserApiRequest";
import UserService from "../../services/User/UserService";
import User from "../../models/User";


class UsersController {
    async get(req: Request, res: Response) { 
        try {
            const user = await User.create({name: 'test1'})
            console.log(user)
            const data = UserApiRequest.get(req);
            // UserService.get(data)
        } catch (error) {
            
        }
    }
    update(req: Request, res: Response) { 
        try {
            
        } catch (error) {
            
        }
    }
    store(req: Request, res: Response) {
        try {
            
        } catch (error) {
            
        }
     }
    delete(req: Request, res: Response) { 
        try {
            
        } catch (error) {
            
        }
    }

}

export default new UsersController();