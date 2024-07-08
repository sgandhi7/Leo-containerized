import axios from '@src/utils/axios';
import { act, renderHook } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { RecoilRoot } from 'recoil';
import useApi from './use-api';

describe('useApi', () => {
  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  beforeEach(() => {
    mock.reset();
  });

  test('should call search successfully', async () => {
    mock.onPost(new RegExp('/wiki-search')).reply(200, { results: [] });
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.search('test', []);
    });
    expect(result.current.search).toBeTruthy();
  });
});
