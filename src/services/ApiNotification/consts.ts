import { Email } from './Email';
import { Telegram } from './Telegram';

export enum TypeEnum {
    EMAIL = 'email',
    TELEGRAM = 'telegram',
}
export const EntityType = {
    [TypeEnum.EMAIL]: Email,
    [TypeEnum.TELEGRAM]: Telegram
};
