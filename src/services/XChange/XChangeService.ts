import fs from 'fs';
import moment from 'moment';
import XChangeClient from "../../dal/XChange/Client";
import { IOpeneXChangeRatesLatest, IOpeneXChangeRatesLatestGet, IOpeneXChangeRatesLatestGetRate } from "../../dal/XChange/types";
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

            result = JSON.parse(oldRates.toString())
            if (result.timestamp && moment.unix(result.timestamp).diff(moment(), 'hours') >= 4) {
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

        const relation = usdRateCurrent / usdRateTarget;
        const rate = relation < 0.2 ? relation.toFixed(3) : relation.toFixed(2);
        return +rate;
    }


}

export default new XChangeService();