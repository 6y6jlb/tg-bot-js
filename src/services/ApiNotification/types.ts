
export interface IApiMessage {
    senderName: string;
    senderContacts: string;
    body: string;

}

export interface IApiNotification {
    message: IApiMessage
}