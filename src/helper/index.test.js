import { max } from './index.js';

describe('`max`', () => {
  describe('given an empty array', () => {
    it('returns 0', () => {
      expect(max([])).toEqual(0);
    })
  })

  describe('given an array of numbers', () => {
    it('returns the max number', () => {
      expect(max([2, 5, 4])).toEqual(5);
    });
  });
});