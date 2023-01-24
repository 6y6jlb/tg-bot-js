import RandomCatService from "./RandomCat/RandomCatService";
import RandomDogService from "./RandomDog/RandomDogService";
import RandomFoxService from "./RandomFox/RandomFoxService";

class RandomImage {
    async getImage(): Promise<string> {
        let imageUrl = '';
        switch (Math.floor(Math.random() * 3)) {
            case 1:
                imageUrl = await RandomDogService.getIcon();
                console.info('RandomDogService was uses for random image')

            case 2:
                imageUrl = await RandomFoxService.getIcon();
                console.info('RandomFoxService was uses for random image')

            default:
                imageUrl = await RandomCatService.getIcon();
                console.info('RandomCatService was uses for random image')
        }

        return imageUrl;
    }

    async getMessage() {
        return '';
    }


}

export default new RandomImage();