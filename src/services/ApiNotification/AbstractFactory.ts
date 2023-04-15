
import { EntityType, TypeEnum } from './consts';
import { IApiNotification as INotification } from './types';

export class ApiNotificationFactory {

    params: INotification;
    canal: TypeEnum;

    constructor(canal: TypeEnum, parameters: INotification) {
        this.canal = canal;
        this.params = parameters;
    }

    build() {
        // @ts-ignore
        return new EntityType[this.canal](this.params)
    }


}
