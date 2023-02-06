export const money = (value: number): string => {
    const locale = 'ru-RU';
    return new Intl.NumberFormat(locale).format(value);
}