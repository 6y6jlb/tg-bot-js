import XChangeClient from "../../dal/XChange/Client";
import { IOpeneXChangeRatesLatestGet } from "../../dal/XChange/types";

class XChangeService {
    get(data: IOpeneXChangeRatesLatestGet) {
            return XChangeClient.get(data);
    }

}

export default new XChangeService();