import { describe, test, expect } from 'vitest';
import checkParams from '../../utils/checkParams.js';

describe('checkParams', () => {
  test('should return a number', () => {
    expect(checkParams('1')).toBe(1);
    expect(checkParams('455')).toBe(455);
  });
  test('should throw an error if params is not a number', () => {
    expect(() => checkParams('test')).toThrow();
    expect(() => checkParams('test')).toThrowError('Invalid params');
  });
});
