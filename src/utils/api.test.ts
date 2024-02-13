import { Prompt } from '@src/types/investigation';
import {
  generateGUID,
  getChatHistory,
  getReference,
  getScore,
  getSource,
  hasReport,
  isMocked,
} from './api';

describe('Api', () => {
  beforeEach(() => {
    process.env.TXTAI_API_URL = undefined;
  });

  it('should not get isMocked when environment variable present', () => {
    process.env.TXTAI_API_URL = 'http://localhost';
    const mocked = isMocked();
    expect(mocked).toEqual(false);
  });

  it('should generate a valid GUID', () => {
    const guid = generateGUID();
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(guid).toMatch(regex);
  });

  it('should return the gdelt source', () => {
    const source = {
      reference: 'reference',
      document: 'document source',
      gdelt: 'gdelt source',
      score: 0.1,
    };
    const result = getSource(source);
    expect(result).toEqual('gdelt source');
  });

  it('should return the audio source', () => {
    const source = {
      reference: 'reference',
      document: 'document source',
      audio: 'audio source',
      score: 0.1,
    };
    const result = getSource(source);
    expect(result).toEqual('audio source');
  });

  it('should return the document source', () => {
    const source = {
      reference: 'reference',
      document: 'document source',
      score: 0.1,
    };
    const result = getSource(source);
    expect(result).toEqual('document source');
  });

  it('should return an empty string for unknown source', () => {
    const source = {
      reference: 'reference',
      document: '',
      score: 0.1,
    };
    const result = getSource(source);
    expect(result).toEqual('');
  });

  it('should return the reference with a prefix', () => {
    const source = {
      reference: 'reference',
      document: 'document source',
      score: 0.1,
    };
    const result = getReference(source);
    expect(result).toEqual(' - reference');
  });

  it('should return an empty string for missing reference', () => {
    const source = {
      reference: '',
      document: 'document source',
      score: 0.1,
    };
    const result = getReference(source);
    expect(result).toEqual('');
  });

  it('should return the score multiplied by 100', () => {
    const source = {
      reference: 'reference',
      document: 'document source',
      score: 0.5,
    };
    const result = getScore(source);
    expect(result).toEqual(50);
  });

  it('should return 0 if the score is not provided', () => {
    const source = {
      reference: 'reference',
      document: 'document source',
      score: 0,
    };
    const result = getScore(source);
    expect(result).toEqual(0);
  });

  it('should return an empty array if prompts is empty', () => {
    const prompts: Prompt[] = [];
    const result = getChatHistory(prompts);
    expect(result).toEqual([]);
  });

  it('should filter out prompts with "Loading..." completion', () => {
    const prompts: Prompt[] = [
      { id: '1', prompt: 'Prompt 1', completion: 'Loading...' },
      { id: '2', prompt: 'Prompt 2', completion: 'Completed' },
      { id: '3', prompt: 'Prompt 3', completion: 'Loading...' },
    ];
    const result = getChatHistory(prompts);
    expect(result).toEqual([{ prompt: 'Prompt 2', completion: 'Completed' }]);
  });

  it('should reverse the order of prompts', () => {
    const prompts: Prompt[] = [
      { id: '1', prompt: 'Prompt 1', completion: 'Completed' },
      { id: '2', prompt: 'Prompt 2', completion: 'Completed' },
      { id: '3', prompt: 'Prompt 3', completion: 'Completed' },
    ];
    const result = getChatHistory(prompts);
    expect(result).toEqual([
      { prompt: 'Prompt 3', completion: 'Completed' },
      { prompt: 'Prompt 2', completion: 'Completed' },
      { prompt: 'Prompt 1', completion: 'Completed' },
    ]);
  });

  it('should return true if the object has a report property', () => {
    expect(hasReport('generate report')).toBe(true);
  });

  it('should return false if the object does not have a report property', () => {
    expect(hasReport('test')).toBe(false);
  });
});
