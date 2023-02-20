
import { TypeEnum, EntityType } from './consts';
import { INotification } from './types';

export class NotificationFactory {

    params: INotification;
    type: TypeEnum;

    constructor(type: TypeEnum, parameters: INotification) {
        this.type = type;
        this.params = parameters;
    }

    build() {
        // @ts-ignore
        return new EntityType[this.type](this.params)
    }

}
