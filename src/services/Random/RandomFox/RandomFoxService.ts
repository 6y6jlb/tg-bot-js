import RandomFoxClient from '../../../dal/RandomFox/Client';

class RandomFoxService {
    private get() {
        return RandomFoxClient.get()
    }

    async getIcon() {
        const data = await this.get()
        return data.image;
    }

    async getLinkk() {
        const data = await this.get()
        return data.link;
    }


}
export default new RandomFoxService();