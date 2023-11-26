import { IGetWeatehrRequest } from "../../requests/Weather/types";
import WeatherClient from "../../dal/Weather/Client"

class WeatherService {
    get(data: IGetWeatehrRequest) {
        return WeatherClient.get(data);
    }

}

export default new WeatherService();