import fs from 'fs';
import moment from 'moment';
import XChangeClient from "../../dal/XChange/Client";
import { IOpeneXChangeRatesCurrencies, IOpeneXChangeRatesLatest, IOpeneXChangeRatesLatestGet, IOpeneXChangeRatesLatestGetRate } from "../../dal/XChange/types";
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
        } catch (error: any) {
            console.warn(error.message)
            result = await this.get();
        }


        const usdRateCurrent = data.current ? result.rates[data.current.toUpperCase()] : 1;
        const usdRateTarget = data.target ? result.rates[data.target.toUpperCase()] : 1;
        if (!usdRateCurrent || !usdRateTarget) {
            throw new EXchangeError('Get rate error' + 'current: ' + data.current + 'target: ' + data.target)
        }

        const relation = (usdRateCurrent / usdRateTarget) * data.count;
        const rate = relation < 0.2 ? relation.toFixed(3) : relation.toFixed(2);
        return +rate;
    }

    async getCurrency() {
        let result: IOpeneXChangeRatesCurrencies;
        try {
            const currencies = await fs.promises.readFile('storage/currencies.json', 'utf-8');
            result = await JSON.parse(currencies.toString())

        } catch (error: any) {
            console.warn(error.message)
            result = await XChangeClient.currencies();

            fs.writeFile('storage/currencies.json', JSON.stringify(result), function (error: any) {
                if (error) {
                    console.warn(error.message)
                } else {
                    console.log('Currencies was writed successfully.');
                }
            });
        }

        return result;
    }


}

export default new XChangeService();