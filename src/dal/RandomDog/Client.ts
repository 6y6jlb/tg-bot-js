import { SERVICE_ROUTES } from "../../utils/const";
import Client from "../absctract/Client";
import { IRandomDog } from './types';

class RandomDogClient extends Client {
    async get(): Promise<IRandomDog> {
        const url = new URL(SERVICE_ROUTES.RANDOM_DOG.BASE + SERVICE_ROUTES.RANDOM_DOG.IMAGE);

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

export default new RandomDogClient();