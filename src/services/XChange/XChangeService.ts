import XChangeClient from "../../dal/XChange/Client";
import { IOpeneXChangeRatesLatestGet, IOpeneXChangeRatesLatestGetRate } from "../../dal/XChange/types";

class XChangeService {
    private async get(data: IOpeneXChangeRatesLatestGet) {
            return await XChangeClient.get(data);
    }

    async getRate(data: IOpeneXChangeRatesLatestGetRate) {
        const result = await this.get({base: data.current})
        return result.rates[data.target];
    }

}

export default new XChangeService();