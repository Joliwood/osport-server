import { test, expect, describe } from 'vitest';
import findWinnerTeam from '../../utils/findWinner.js';

describe('findWinnerTeam', () => {
  test('should return 1 if scoreTeam1 > scoreTeam2', () => {
    expect(findWinnerTeam(2, 1)).toBe(1);
  });
  test('should return 2 if scoreTeam1 < scoreTeam2', () => {
    expect(findWinnerTeam(1, 2)).toBe(2);
  });
  test('should return 0 if scoreTeam1 = scoreTeam2', () => {
    expect(findWinnerTeam(1, 1)).toBe(0);
  });
});
