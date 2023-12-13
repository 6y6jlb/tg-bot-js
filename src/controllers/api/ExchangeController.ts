import { Request, Response } from "express";
import ExchangeApiRequest from "../../requests/Exchange/ExchangeApiRequest";
import XChangeService from "../../services/XChange/XChangeService";
import ErrorResponse from "../../services/response/ErrorResponse";

class ExchangeController {
    async get(req: Request, res: Response) {
        try {
            const validParams = await ExchangeApiRequest.get(req);
            const data = await XChangeService.getRate(validParams);
            res.json(data)
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }
}


export default new ExchangeController();