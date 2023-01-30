import XChangeClient from "../../dal/XChange/Client";
import { IOpeneXChangeRatesLatestGet, IOpeneXChangeRatesLatestGetRate } from "../../dal/XChange/types";

class XChangeService {
    private async get(data: IOpeneXChangeRatesLatestGet) {
            return await XChangeClient.get(data);
    }

    async getRate(data: IOpeneXChangeRatesLatestGetRate):Promise<number> {
        const result = await this.get({base: data.current})
        return +(result.rates[data.target.toUpperCase()])?.toFixed(2);
    }

}

export default new XChangeService();