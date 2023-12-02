
import { TypeEnum, EntityType } from './consts';
import { IBotNotification as INotification, TypeToClassMapping } from './types';

export class NotificationFactory<T extends TypeEnum> {

    params: INotification;
    type: T;

    constructor(type: T, parameters: INotification) {
        this.type = type;
        this.params = parameters;
    }

    build(): TypeToClassMapping[T] {
        return new EntityType[this.type](this.params as any) as TypeToClassMapping[T];
    }

}
