import fs from 'fs';
import moment from 'moment';
import XChangeClient from "../../dal/XChange/Client";
import { IOpeneXChangeRatesCurrecies, IOpeneXChangeRatesLatest, IOpeneXChangeRatesLatestGet, IOpeneXChangeRatesLatestGetRate } from "../../dal/XChange/types";
import { EXchangeError } from './../../exceptions/Exchange';

class XChangeService {
    private async get(data?: IOpeneXChangeRatesLatestGet) {
        const result = await XChangeClient.get(data);
        fs.writeFile('storage/exchangeRate.json', JSON.stringify(result), function (error) {
            if (error) {
                console.warn(error.message)
            } else {
                console.log('Rate was writed successfully.');
            }
        });
        return result;
    }


    async getRate(data: IOpeneXChangeRatesLatestGetRate): Promise<number> {

        let result: IOpeneXChangeRatesLatest;

        try {
            const oldRates = await fs.promises.readFile('storage/exchangeRate.json', 'utf-8');
            result = await JSON.parse(oldRates.toString())
            if (result.timestamp && moment().diff(moment.unix(result.timestamp), 'hours') >= 4) {
                result = await this.get();
            }
        } catch (error) {
            console.warn(error.message)
            result = await this.get();
        }


        const usdRateCurrent = result.rates[data.current.toUpperCase()];
        const usdRateTarget = result.rates[data.target.toUpperCase()];
        if (!usdRateCurrent || !usdRateTarget) {
            throw new EXchangeError('Get rate error' + 'current: ' + data.current + 'target: ' + data.target)
        }

        const relation = (usdRateCurrent / usdRateTarget) * data.count;
        const rate = relation < 0.2 ? relation.toFixed(3) : relation.toFixed(2);
        return +rate;
    }

    async getCurrency() {
        let result: IOpeneXChangeRatesCurrecies;
        try {
            const currencies = await fs.promises.readFile('storage/currecies.json', 'utf-8');
            result = await JSON.parse(currencies.toString())
            
        } catch (error) {
            console.warn(error.message)
            result = await XChangeClient.currecies();
        }

        return result;
    }


}

export default new XChangeService();