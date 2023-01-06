export enum OPEN_WEATHER_UNITS {
    IMPERIAL = 'imperial', //farengheit
    METRIC = 'metric', //celsius
    DEFAULT = '' //kelvin
}

export const TEMPERATURE_SIGN = {
    [OPEN_WEATHER_UNITS.DEFAULT]: '°K',
    [OPEN_WEATHER_UNITS.METRIC]: '°C',
    [OPEN_WEATHER_UNITS.IMPERIAL]: '°F',
}