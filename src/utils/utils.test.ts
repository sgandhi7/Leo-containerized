import { convertToReadableFormat } from './utils';

describe('convertToReadableFormat', () => {
  it('should return an empty string if dateString is undefined', () => {
    const result = convertToReadableFormat(undefined);
    expect(result).toBe('');
  });

  it('should return a readable string if dateString is a string', () => {
    const date = new Date();
    const result = convertToReadableFormat(date.toISOString());
    expect(result).toBe(date.toLocaleString());
  });

  it('should return a readable string if dateString is a number', () => {
    const date = new Date();
    const result = convertToReadableFormat(date.getTime());
    expect(result).toBe(date.toLocaleString());
  });

  it('should return a readable string if dateString is a Date object', () => {
    const date = new Date();
    const result = convertToReadableFormat(date);
    expect(result).toBe(date.toLocaleString());
  });
});
