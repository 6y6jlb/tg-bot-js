export class WeatherError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "WeatherError";
    }
};