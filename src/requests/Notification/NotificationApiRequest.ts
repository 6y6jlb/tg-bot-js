import { Request } from "express";
import { ISendNotificationRequest } from "./types";

class NotificationApiRequest {
    send(request: Request): ISendNotificationRequest {
        const { senderName, senderContacts, body  } = request.body
        return { senderName, senderContacts, body  } as ISendNotificationRequest;
    }

}

export default new NotificationApiRequest();