import { IGetWeatehrRequest } from './types';
import { Request } from "express";
import { WeatherError } from '../../exceptions/Weather';

class WeatherApiRequest {
    get(request: Request): IGetWeatehrRequest {
        const { city, lang, units } = request.query
        if (city) {
            return { city, lang, units } as IGetWeatehrRequest;
        }
        throw new WeatherError('Incorrect data')
    }
}

export default new WeatherApiRequest();