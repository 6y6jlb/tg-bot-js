import RandomDogClient from '../../dal/RandomDog/Client';
import { IRandomDog } from '../../dal/RandomDog/types';

class RandomDogService {
    private get() {
        return RandomDogClient.get()
    }


    async getIcon() {
        const data = await this.get()
        return data.url;
    }

}

export default new RandomDogService();