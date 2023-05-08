import { Request } from "express";
import { IOpeneXChangeRatesLatestGetRate } from "../../dal/XChange/types";
import { EXchangeError } from '../../exceptions/Exchange';

class ExchangeApiRequest {
    get(request: Request): IOpeneXChangeRatesLatestGetRate {
        const { count, target, current } = request.query
        if (target && current) {
            return { count: count || 1, target, current } as IOpeneXChangeRatesLatestGetRate;
        }
        throw new EXchangeError('Incorrect data')
    }
}

export default new ExchangeApiRequest();