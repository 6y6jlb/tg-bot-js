import { Notification } from './Notification';
import { INotification } from './types';

export class Builder {

    message: Notification;

    constructor(parameters: INotification) {
        this.message = new Notification(parameters);
    }

    build() {
        return this.message;
    }
}