import { Request } from "express";
import { IOpeneXChangeRatesLatestGetRate } from "../../dal/XChange/types";
import { EXchangeError } from '../../exceptions/Exchange';
import { getSchema } from "./schema";

class ExchangeApiRequest {
    async get(request: Request): Promise<IOpeneXChangeRatesLatestGetRate> {

        await getSchema.validateAsync(request.query);

        const { count, target, current } = request.query

        return { count: count || 1, target, current } as IOpeneXChangeRatesLatestGetRate;
    }
}

export default new ExchangeApiRequest();