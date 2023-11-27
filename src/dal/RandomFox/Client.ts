import { SERVICE_ROUTES } from "../../utils/const";
import Client from "../absctract/Client";
import { IRandomFox } from './types';

class RandomFoxClient extends Client {
    async get(): Promise<IRandomFox> {
        const url = new URL(SERVICE_ROUTES.RANDOM_FOX.BASE + SERVICE_ROUTES.RANDOM_FOX.IMAGE);

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
        return data;
    }

    
}

export default new RandomFoxClient();