import { EXchangeError } from './../../exceptions/Exchange';
import XChangeClient from "../../dal/XChange/Client";
import { IOpeneXChangeRatesLatestGet, IOpeneXChangeRatesLatestGetRate } from "../../dal/XChange/types";

class XChangeService {
    private async get(data?: IOpeneXChangeRatesLatestGet) {
        return await XChangeClient.get(data);
    }

    async getRate(data: IOpeneXChangeRatesLatestGetRate): Promise<number> {
        const result = await this.get()
        const usdRateCurrent = result.rates[data.current.toUpperCase()];
        const usdRateTarget = result.rates[data.target.toUpperCase()];
        if (!usdRateCurrent || !usdRateTarget) {
            throw new EXchangeError('Get rate error' + 'current: ' + data.current + 'target: ' + data.target)
        }
        return +(usdRateCurrent / usdRateTarget).toFixed(2);
    }

}

export default new XChangeService();