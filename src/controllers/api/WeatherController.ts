import { Request, Response } from "express";
import WeatherApiRequest from "../../requests/Weather/WeatherApiRequest";
import WeatherService from "../../services/Weather/WeatherService";

class WeatherController {
    async get(req: Request, res: Response) {
        try {
            const data = WeatherApiRequest.get(req);
            res.json(await WeatherService.get(data))
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    }
}


export default new WeatherController();