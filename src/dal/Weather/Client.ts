import { IOpenWeatherResponse } from './types';
import { IGetWeatehrRequest } from "../../requests/Weather/types";
import config from "../../utils/config";
import { SERVICE_ROUTES } from "../../utils/const";
import Client from "../absctract/Client"
import fetch, { RequestInfo, RequestInit } from 'node-fetch';

class WeatherClient extends Client {
    async get(params: IGetWeatehrRequest): Promise<IOpenWeatherResponse & IGetWeatehrRequest> {
        const url = new URL(SERVICE_ROUTES.OPEN_WEATHER.BASE + SERVICE_ROUTES.OPEN_WEATHER.ENTPOINTS.WEATHER);


        url.searchParams.append('appid', config.WEATHER_API_KEY);
        url.searchParams.append('units', params.units || 'metric');
        url.searchParams.append('lang', params.lang || 'ru');

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
        return {
            ...data,
            units: params.units || 'metric',
            lang: params.lang || 'ru'
        };
    }

}

export default new WeatherClient();