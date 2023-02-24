import {describe, expect, test} from '@jest/globals';
import {money} from './common';

describe('common helpers', () => {
  test('it return correct money format', () => {
    expect(money(10.22)).toBe('10,22');
  });
});