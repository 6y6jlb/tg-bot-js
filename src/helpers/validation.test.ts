import { describe, expect, test } from '@jest/globals';
import { EXchangeError } from './../exceptions/Exchange';
import { CreateTaskError } from './../exceptions/Task';
import { exhangeRequestValidation, taskCreationValidator, taskTimeValidator } from './validation';

describe('validation', () => {
    test('it validate correct string for task creation vol.1', () => {
        expect(taskCreationValidator('20:00 - new reminder - Europe/Moscow')).toEqual({ "options": "new reminder", "time": "20:00", "timezone": "Europe/Moscow" });
    });

    test('it validate correct string for task creation vol.2', () => {
        expect(taskCreationValidator('20:00 - Новая задача - Europe/Moscow')).toEqual({ "options": "Новая задача", "time": "20:00", "timezone": "Europe/Moscow" });
    });

    test('it validate correct string for task creation vol.3', () => {
        expect(taskCreationValidator('20:00 - Moscow - Europe/Moscow')).toEqual({ "options": "Moscow", "time": "20:00", "timezone": "Europe/Moscow" });
    });

    test('it fail validate task creation vol.1', () => {
        expect(() => taskCreationValidator('20:00- Moscow')).toThrow(CreateTaskError);
        expect(() => taskCreationValidator('20:00- Moscow')).toThrow('Message validation error ( 20:00- Moscow )');
    });

    test('it fail validate task creation vol.2', () => {
        expect(() => taskCreationValidator('20:00 Moscow - Europe/Moscow')).toThrow(CreateTaskError);
        expect(() => taskCreationValidator('20:00 Moscow - Europe/Moscow')).toThrow('Message validation error ( 20:00 Moscow - Europe/Moscow )');
    });

    test('it validate correct string for task time vol.1', () => {
        expect(() => taskTimeValidator('20:00')).toBeTruthy();
    });


    test('it validate correct string for task time vol.2', () => {
        expect(() => taskTimeValidator('00:00')).toBeTruthy();
    });


    test('it fail validate task time vol.1', () => {
        expect(taskTimeValidator('00:99')).toBeFalsy();
    });

    test('it fail validate task time vol.2', () => {
        expect(taskTimeValidator('00:001')).toBeFalsy();
    });

    test('it fail validate task time vol.3', () => {
        expect(taskTimeValidator('00-99')).toBeFalsy();
    });

    test('it validate correct exchange task string vol.1', () => {
        expect(exhangeRequestValidation('100 usd rub')).toEqual({ "count": 100, "current": "RUB", "target": "USD" });
    });

    test('it validate correct exchange task string vol.2', () => {
        expect(exhangeRequestValidation('usd rub')).toEqual({ "count": 1, "current": "RUB", "target": "USD" });
    });

    test('it fail validate exchange string vol.1', () => {
        expect(() => exhangeRequestValidation('usd - rub')).toThrow(EXchangeError);
        expect(() => exhangeRequestValidation('usd - rub')).toThrow('Message validation error ( usd - rub )');
    });

    test('it fail validate exchange string vol.2', () => {
        expect(() => exhangeRequestValidation('usd')).toThrow(EXchangeError);
        expect(() => exhangeRequestValidation('usd')).toThrow('Message validation error ( usd )');
    });

});