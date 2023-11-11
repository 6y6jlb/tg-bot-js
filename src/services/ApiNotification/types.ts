
export interface IApiMessage {
    contacts: string;
    name: string;
    message: string;

}

export interface IApiNotification {
    message: IApiMessage
}