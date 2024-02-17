import { pressureConnverter } from "../../helpers/common";
import { IGetWeatehrRequest } from "../../requests/Weather/types";
import config from "../../utils/config";
import { PRESSURE_UNIT, SERVICE_ROUTES } from "../../utils/const";
import Client from "../absctract/Client";
import { IOpenWeatherResponse } from './types';

class WeatherClient extends Client {
    async get(params: IGetWeatehrRequest): Promise<IOpenWeatherResponse & IGetWeatehrRequest> {

        const url = new URL(SERVICE_ROUTES.OPEN_WEATHER.BASE + SERVICE_ROUTES.OPEN_WEATHER.ENTPOINTS.WEATHER);
        url.searchParams.append('appid', config.WEATHER_API_KEY as string);
        url.searchParams.append('units', params.units || 'metric');
        url.searchParams.append('lang', params.lang || 'en');

        if (params.city) {
            url.searchParams.append('q', params.city);
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                cache: 'no-cache',
                credentials: 'same-origin',
                'Content-Type': 'application/json'
            },
        });
        await this.throwOnError(response);
        const data = await response.json();

        console.log('Weather for ' + params.city + ' succesfull request.')

        const icon = this.getIcon(data.weather[0].icon)
        return {
            ...data,
            main: { ...data.main, pressure: pressureConnverter(Number(data.main.pressure), PRESSURE_UNIT.mmHg), },
            icon,
            units: params.units || 'metric',
            lang: params.lang || 'ru'
        };
    }

    private getIcon(value: string) {
        return `http://openweathermap.org/img/wn/${value}@4x.png`
    }

}

export default new WeatherClient();