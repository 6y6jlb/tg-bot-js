import moment from 'moment';
import fs from 'fs';
import { EXchangeError } from './../../exceptions/Exchange';
import XChangeClient from "../../dal/XChange/Client";
import { IOpeneXChangeRatesLatestGet, IOpeneXChangeRatesLatestGetRate } from "../../dal/XChange/types";

class XChangeService {
    private async get(data?: IOpeneXChangeRatesLatestGet) {
        return await XChangeClient.get(data);
    }
    

    async getRate(data: IOpeneXChangeRatesLatestGetRate): Promise<number> {

        const oldRates = await fs.promises.readFile('storage/exchangeRate.json', 'utf-8');
        let result = JSON.parse(oldRates.toString())
        if (result.timestamp && moment.unix(result.timestamp).diff(moment(), 'hours') >= 4) {
            result = await this.get();
            fs.writeFile('storage/exchangeRate.json', JSON.stringify(result), function (err) {
                if (err) throw err;
                console.log('Rate was writed successfully.');
            });
        }

        const usdRateCurrent = result.rates[data.current.toUpperCase()];
        const usdRateTarget = result.rates[data.target.toUpperCase()];
        if (!usdRateCurrent || !usdRateTarget) {
            throw new EXchangeError('Get rate error' + 'current: ' + data.current + 'target: ' + data.target)
        }

        const relation = usdRateCurrent / usdRateTarget;
        const rate = relation < 0.2 ? relation.toFixed(2) : relation.toFixed(3);
        return +rate;
    }


}

export default new XChangeService();