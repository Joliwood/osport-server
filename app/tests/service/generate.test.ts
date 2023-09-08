import { describe, expect, test } from 'vitest';
import {
  getMaxIndex,
  useRandomConditionAtStart,
  deleteFromArrayAfterPush,
  getRandomArbitrary,
  getTeamValue,
  getPlayerObject,
  divideInTeam,
} from '../../service/generateTeam.js';

describe('getMaxIndex', () => {
  test('should return the index of the max value', () => {
    expect(typeof getMaxIndex([1, 2, 3])).toBe('number');
    expect(getMaxIndex([1, 2, 3])).toBe(2);
    expect(getMaxIndex([3, 3, 2])).toBe(0);
  });
});

describe('useRandomConditionAtStart', () => {
  test('should return true or false when participant > ids.length', () => {
    expect(typeof useRandomConditionAtStart(3, [1, 2], 1, 2)).toBe('boolean');
    expect(useRandomConditionAtStart(3, [1, 2], 1, 2)).toBe(true);
    expect(useRandomConditionAtStart(3, [1, 2], 2, 1)).toBe(false);
  });
});

describe('deleteFromArrayAfterPush', () => {
  test('should delete the index from the array', () => {
    const ids = [1, 2, 3];
    const values = [1, 2, 3];
    const index = 0;
    deleteFromArrayAfterPush(ids, values, index);
    expect(ids).toEqual([2, 3]);
    expect(values).toEqual([2, 3]);
  });
});

describe('getRandomArbitrary', () => {
  test('should return a random number between min and max', () => {
    expect(typeof getRandomArbitrary(0, 1)).toBe('number');
    expect(getRandomArbitrary(0, 1)).toBeGreaterThan(0);
    expect(getRandomArbitrary(0, 1)).toBeLessThan(1);
  });
});

const mockTeams = [{ rating: 1, id: 2 }, { rating: 2, id: 1 }];

describe('getTeamValue', () => {
  test('should return the sum of the rating of each player', () => {
    expect(typeof getTeamValue(mockTeams)).toBe('number');
    expect(getTeamValue(mockTeams)).toBe(3);
  });
});

describe('getPlayerObject', () => {
  test('should return an object with the id and rating', () => {
    expect(typeof getPlayerObject(0, [1, 2, 3], [1, 2, 3])).toBe('object');
    expect(getPlayerObject(0, [1, 2, 3], [1, 2, 3])).toEqual({ id: 1, rating: 1 });
  });
});

const mockConfig = {
  team1: [],
  team2: [],
  ids: [1, 2, 3, 4],
  values: [5, 7, 1, 5],
  participants: 4,
};

describe('divideInTeam', () => {
  test('should return an object with error prop when particpants are not even', () => {
    const mockConfig3 = {
      team1: [],
      team2: [],
      ids: [1, 2, 3],
      values: [5, 7, 1],
      participants: 3,
    };
    const result = divideInTeam(mockConfig3);

    expect(result).toHaveProperty('error');
  });
  test('should return an object with the two teams', () => {
    expect(typeof divideInTeam(mockConfig)).toBe('object');
    expect(divideInTeam(mockConfig)).toHaveProperty('team_1');
    expect(divideInTeam(mockConfig)).toHaveProperty('team_2');
  });
  test('should return two object with the same length', () => {
    const mockConfig2 = {
      team1: [],
      team2: [],
      ids: [1, 2, 3, 4],
      values: [5, 7, 1, 5],
      participants: 4,
    };
    const result = divideInTeam(mockConfig2);
    expect(result?.team_1?.length).toEqual(result?.team_2?.length);
  });
});
