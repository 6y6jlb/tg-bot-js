import { Request, Response } from "express";
import ExchangeApiRequest from "../../requests/Exchange/ExchangeApiRequest";
import XChangeService from "../../services/XChange/XChangeService";

class ExchangeController {
    async get(req: Request, res: Response) {
        try {
            const validParams = await ExchangeApiRequest.get(req);
            const data = await XChangeService.getRate(validParams);
            res.json(data)
        } catch (error) {
            res.status(error.code || 400).json({ message: error.message })
        }
    }
}


export default new ExchangeController();