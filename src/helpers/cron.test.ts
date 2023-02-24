import {describe, expect, test} from '@jest/globals';
import {convertDateToCronExpression} from './cron';

describe('cron helpers', () => {
  test('it return correct cron expression vol.1', () => {
    expect(convertDateToCronExpression(new Date('04 Dec 1995 00:12:00 GMT'), false)).toBe('12 4 4 12 *');
  });

  test('it return correct cron expression vol.2', () => {
    expect(convertDateToCronExpression(new Date('04 Dec 1995 00:12:00 GMT'))).toBe('12 4 * * *');
  })
});