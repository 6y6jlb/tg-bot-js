import { IGetWeatehrRequest } from './types';
import { Request } from "express";
import { GetWeatherError } from '../../exceptions/Weather';

class WeatherApiRequest {
    get(request: Request): IGetWeatehrRequest {
        const { city } = request.query
        if (city) {
            return { city } as IGetWeatehrRequest;
        }
        throw new GetWeatherError('Incorrect data')
    }
}

export default new WeatherApiRequest();