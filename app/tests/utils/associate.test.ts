import { describe, test, expect } from 'vitest';
import associate from '../../utils/associate.js';
import type { Levels } from '../../@types/index.d.ts';

describe('associate', () => {
  test('should return an number', () => {
    expect(associate('test' as Levels)).toEqual(5);
    expect(typeof associate('test' as Levels)).toBe('number');
  });
  test('should return 2 if the string is "Beginner"', () => {
    expect(typeof associate('Beginner' as Levels)).toBe('number');
    expect(associate('Beginner' as Levels)).toEqual(2);
    expect(associate('Beginner' as Levels)).not.toEqual(5);
    expect(associate('Beginner' as Levels)).not.toEqual(8);
    expect(associate('beginner' as Levels)).toEqual(2);
  });
  test('should return 5 if the string is "Intermediate"', () => {
    expect(typeof associate('Intermediate' as Levels)).toBe('number');
    expect(associate('Intermediate' as Levels)).toEqual(5);
    expect(associate('Intermediate' as Levels)).not.toEqual(2);
    expect(associate('Intermediate' as Levels)).not.toEqual(8);
    expect(associate('intermediate' as Levels)).toEqual(5);
  });
  test('should return 8 if the string is "Advanced"', () => {
    expect(typeof associate('Advanced' as Levels)).toBe('number');
    expect(associate('Advanced' as Levels)).toEqual(8);
    expect(associate('Advanced' as Levels)).not.toEqual(2);
    expect(associate('Advanced' as Levels)).not.toEqual(5);
    expect(associate('advanced' as Levels)).toEqual(8);
  });
});
