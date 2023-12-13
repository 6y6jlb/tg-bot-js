import { Request, Response } from "express";
import NotificationApiRequest from "../../requests/Notification/NotificationApiRequest";
import { ApiNotificationFactory } from "../../services/ApiNotification/AbstractFactory";
import { TypeEnum } from "../../services/ApiNotification/consts";
import ErrorResponse from "../../services/response/ErrorResponse";



class NotificationController {
    async send(req: Request, res: Response) {
        const canal = req.params.canal as TypeEnum;
        try {
            const data = await NotificationApiRequest.send(req);
            const factory = new ApiNotificationFactory(canal, { message: data }).build();
            await factory.send();

            res.json({ message: 'ok' })
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }

}

export default new NotificationController();