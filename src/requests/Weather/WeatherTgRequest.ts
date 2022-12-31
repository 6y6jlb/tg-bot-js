import { GetWeatherError } from '../../exceptions/Weather';
import { IGetWeatehrRequest } from './types';

class WeatherTgRequest {
    get(request: string): IGetWeatehrRequest {
        const city = request.trim()
        if (city.length) {
            return { city };
        }
        throw new GetWeatherError('Incorrect data')
    }
}

export default new WeatherTgRequest();