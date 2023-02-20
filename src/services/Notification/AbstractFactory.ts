
import { Callback } from './Callback';
import { Message } from './Message';
import { INotification } from './types';

enum TypeEnum {
    MESSAGE = 'MESSAGE',
    CALLBACK = 'CALLBACK',
}

const EntityType = {
    [TypeEnum.MESSAGE]: Message,
    [TypeEnum.CALLBACK]: Callback
}

export class Builder {

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