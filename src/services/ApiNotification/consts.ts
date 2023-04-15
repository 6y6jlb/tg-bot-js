import { Email } from './Email';

export enum TypeEnum {
    EMAIL = 'email',
    TELEGRAM = 'telegram',
}
export const EntityType = {
    [TypeEnum.EMAIL]: Email,
    // [TypeEnum.TELEGRAM]: Telegram
};
