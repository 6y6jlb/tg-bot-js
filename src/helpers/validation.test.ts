import { TaskError, CreateTaskError } from './../exceptions/Task';
import { describe, expect, test } from '@jest/globals';
import { exhangeRequestValidation, isNumeric, taskCreationValidator, taskTimeValidator } from './validation';

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
        expect(()=> taskCreationValidator('20:00- Moscow')).toThrow(CreateTaskError);
        expect(()=> taskCreationValidator('20:00- Moscow')).toThrow('20:00- Moscow');
    });

    test('it fail validate task creation vol.2', () => {
        expect(()=> taskCreationValidator('20:00 Moscow - Europe/Moscow')).toThrow(CreateTaskError);
        expect(()=> taskCreationValidator('20:00 Moscow - Europe/Moscow')).toThrow('20:00 Moscow - Europe/Moscow');
    });

});