import WeatherClient from "../../dal/Weather/Client";
import { WeatherError } from "../../exceptions/Weather";
import { IGetWeatehrRequest } from "../../requests/Weather/types";

class WeatherService {
    async get(data: IGetWeatehrRequest) {
        try {
            return await WeatherClient.get(data);
        } catch (error) {
            console.warn(error)
            throw new WeatherError('Weather response error')
        }

    }

}

export default new WeatherService();