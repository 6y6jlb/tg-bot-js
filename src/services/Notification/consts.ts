import { Callback } from './Callback';
import { Message } from './Message';

export enum TypeEnum {
    MESSAGE = 'MESSAGE',
    CALLBACK = 'CALLBACK'
}
export const EntityType = {
    [TypeEnum.MESSAGE]: Message,
    [TypeEnum.CALLBACK]: Callback
};
