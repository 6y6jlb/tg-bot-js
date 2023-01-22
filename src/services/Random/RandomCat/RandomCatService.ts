import RandomCatClient from '../../../dal/RandomCat/Client';

class RandomCatService {
    private async  get() {
        return await RandomCatClient.get()
    }


    async getIcon() {
        const data = await this.get()
        return data.url;
    }

}

export default new RandomCatService();