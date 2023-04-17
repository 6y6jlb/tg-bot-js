import { Request } from "express";
import { ISendNotificationRequest } from "./types";
import { NotificationError } from "../../exceptions/Notification";

class NotificationApiRequest {
    send(request: Request): ISendNotificationRequest {
        const { senderName, senderContacts, body } = request.body
        if (!((senderContacts || senderContacts) && body)) {
            throw new NotificationError('Incorrect request data: ' + JSON.stringify(request.body))
        }
        return { senderName, senderContacts, body } as ISendNotificationRequest;
    }

}

export default new NotificationApiRequest();