import { Request, Response } from "express";
import WeatherApiRequest from "../../requests/Weather/WeatherApiRequest";
import WeatherService from "../../services/Weather/WeatherService";

class WeatherController {
    async get(req: Request, res: Response) {
        try {
            const validParams = WeatherApiRequest.get(req);
            const data = await WeatherService.get(validParams);
            res.json(data)
        } catch (error) {
            res.status(error.code || 400).json({ message: error.message })
        }
    }
}


export default new WeatherController();