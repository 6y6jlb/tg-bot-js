
import { i18n } from 'i18next';
import { EntityType, TypeEnum } from './consts';
import { IApiMessage, IApiNotification } from './types';
import LocaleService from '../Locale/LocaleService';

export abstract class ApiNotification {

    protected canal: TypeEnum
    protected message: IApiMessage;
    protected localeService: typeof LocaleService

    constructor(parameters: IApiNotification) {

        this.message = parameters.message;
        this.localeService = LocaleService;
    }

    abstract send(message: IApiMessage): void


    protected build() {
        // @ts-ignore
        return new EntityType[this.canal](this.message)
    }

}