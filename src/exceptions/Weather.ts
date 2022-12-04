export class GetWeatherError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GetWeatherError";
    }
};