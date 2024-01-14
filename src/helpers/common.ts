import { PRESSURE_UNIT, getPressureRationByUnit } from "../utils/const";

export const money = (value: number): string => {
    const locale = 'ru-RU';
    return new Intl.NumberFormat(locale).format(value);
}

export const pressureConnverter = (value: number, targetUnit = PRESSURE_UNIT.mmHg) => {

    const converterFunc = (value: number, ratio: number): number => Math.ceil(value * ratio)

    return converterFunc(value, getPressureRationByUnit(targetUnit))

}