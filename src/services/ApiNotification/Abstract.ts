
import { EntityType, TypeEnum } from './consts';
import { IApiMessage, IApiNotification } from './types';

export abstract class ApiNotification {

    protected canal: TypeEnum
    protected message: IApiMessage;

    constructor(parameters: IApiNotification) {

        this.message = parameters.message
    }

    abstract send(message: IApiMessage): void


    protected build() {
        // @ts-ignore
        return new EntityType[this.canal](this.message)
    }

}