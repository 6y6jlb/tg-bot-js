import RandomCatService from "./RandomCat/RandomCatService";
import RandomDogService from "./RandomDog/RandomDogService";
import RandomFoxService from "./RandomFox/RandomFoxService";

class RandomImage {
    async get() {
        switch (Math.floor(Math.random() * 3)) {
            case 1:
                return await RandomDogService.getIcon();

            case 2:
                return await RandomFoxService.getIcon()
        
            default:
                return await RandomCatService.getIcon();
        }
    }

    
}

export default new RandomImage();