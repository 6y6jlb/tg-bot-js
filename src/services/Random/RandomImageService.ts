import RandomDogService from "./RandomDog/RandomDogService";
import RandomFoxService from "./RandomFox/RandomFoxService";

class RandomImage {
    async get() {
        switch (Math.floor(Math.random() * 2)) {
            case 1:
                return await RandomDogService.getIcon()
        
            default:
                return await RandomFoxService.getIcon();
        }
    }

    
}

export default new RandomImage();