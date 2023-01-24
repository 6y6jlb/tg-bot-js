import RandomCatService from "./RandomCat/RandomCatService";
import RandomDogService from "./RandomDog/RandomDogService";
import RandomFoxService from "./RandomFox/RandomFoxService";

class RandomImage {
    async getImage(): Promise<string> {
        let imageUrl = '';
        switch (Math.floor(Math.random() * 3)) {
            case 1:
                imageUrl = await RandomDogService.getIcon();
                break;

            case 2:
                imageUrl = await RandomFoxService.getIcon();
                break;

            default:
                imageUrl = await RandomCatService.getIcon();
                break;
        }
        console.info('Image url ' + imageUrl)
        return imageUrl;
    }

    async getMessage() {
        return '';
    }


}

export default new RandomImage();