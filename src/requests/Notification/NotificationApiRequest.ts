import { Request } from "express";
import { ISendNotificationRequest } from "./types";
import { sendSchema } from "./schema";
import { IApiMessage } from "../../services/ApiNotification/types";

class NotificationApiRequest {
    async send(request: Request<{}, {}, IApiMessage>): Promise<ISendNotificationRequest> {

        await sendSchema.validateAsync(request.body);

        return { message: request.body.message, name: request.body.name, contacts: request.body.contacts } as ISendNotificationRequest;
    }

}

export default new NotificationApiRequest();