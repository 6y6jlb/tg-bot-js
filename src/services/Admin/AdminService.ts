import moment, { Moment } from 'moment';
import TelegramBotApi from 'node-telegram-bot-api';
import { AdminError } from '../../exceptions/Admin';
import User from '../../models/User';
import { ROLE } from '../../models/const';
import { IUser } from '../../models/types';
import { TelegramNotificator } from '../BotNotification/TelegramNotificator';
import LocaleService from '../Locale/LocaleService';

class AdminService {
    localeService: typeof LocaleService;
    adminList: Pick<IUser, 'telegram_id' | '_id' | 'locale'>[]
    updated_at: Moment
    constructor() {
        this.adminList = [];
        this.updated_at = moment().subtract(25, 'minutes')
        this.localeService = LocaleService
    }

    async sendMesssageToAdmin(notificator: TelegramNotificator, template: { textObject: { text?: string, key?: string, variables?: object }, options?: TelegramBotApi.SendMessageOptions }): Promise<void> {

        await this.fetchManagers();

        try {
            console.info(`Admin target message: "${template.textObject}" at ${moment().format('HH:mma M.D.YYYY')}`)
            for (let i = 0; i < this.adminList.length; i++) {

                const manager = this.adminList[i];
                this.localeService.i18.changeLanguage(manager.locale)


                const message = template.textObject.key
                    ? this.localeService.i18.t(template.textObject.key, { ...template.textObject.variables })
                    : template.textObject.text;

                if (manager.telegram_id && message) {
                    await notificator.send(String(manager.telegram_id), { text: message, options: template.options })
                } else {
                    console.warn(`Message: " ${message} " was not sended fot manager: ${manager._id}`)
                }

            }
        } catch (error: any) {
            throw new AdminError('Send message to Admin error: ' + error.message)
        }


    }

    public async checkAdmin(user_id: any) {

        await this.fetchManagers();

        return user_id && this.adminList.find(user => user._id === user_id || user.telegram_id === user_id);
    }

    private async fetchManagers() {
        if (this.updated_at.diff(moment(), 'minutes') > 15) {
            return
        }

        const managers = await User.find({ roles: { "$in": [ROLE.ADMIN] } });
        this.adminList = managers.map(user => ({ _id: user._id, locale: user.locale, telegram_id: user.telegram_id }))
        this.updated_at = moment()

    }
}

export default new AdminService();