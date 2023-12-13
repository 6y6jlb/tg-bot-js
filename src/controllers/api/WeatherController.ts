import { Request, Response } from "express";
import WeatherApiRequest from "../../requests/Weather/WeatherApiRequest";
import WeatherService from "../../services/Weather/WeatherService";
import ErrorResponse from "../../services/response/ErrorResponse";

class WeatherController {
    async get(req: Request, res: Response) {
        try {
            const validParams = WeatherApiRequest.get(req);
            const data = await WeatherService.get(validParams);
            res.json(data)
        } catch (error: any) {
            ErrorResponse.setError(error).setResponse(res).build().json()
        }
    }
}


export default new WeatherController();