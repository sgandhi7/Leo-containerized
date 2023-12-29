import { datasets } from '@src/data/dataset';
import axios from '@src/utils/axios';
import { act, renderHook } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { RecoilRoot } from 'recoil';
import useDatasetApi from './use-suggestions-api';

describe('useDatasetApi', () => {
  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  beforeEach(() => {
    mock.reset();
  });

  test('should call getItems successfully', async () => {
    mock.onGet(new RegExp('/datasets')).reply(200, { results: [] });
    const { result } = renderHook(() => useDatasetApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItems();
    });
    expect(result.current.getItems).toBeTruthy();
  });

  test('should call getItems successfully with data', async () => {
    mock.onGet(new RegExp('/datasets')).reply(200, { results: datasets });
    const { result } = renderHook(() => useDatasetApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItems();
    });
    expect(result.current.getItems).toBeTruthy();
  });

  test('should call getItems with error', async () => {
    mock.onGet(new RegExp('/datasets')).reply(500, { error: 'error' });
    const { result } = renderHook(() => useDatasetApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItems();
    });
    expect(result.current.getItems).toBeTruthy();
  });

  test('should call getItem successfully', async () => {
    mock.onGet(new RegExp('/datasets/1')).reply(200, null);
    const { result } = renderHook(() => useDatasetApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItem('1');
    });
    expect(result.current.getItem).toBeTruthy();
  });

  test('should call getItem successfully with data', async () => {
    mock.onGet(new RegExp('/datasets/1')).reply(200, datasets[0]);
    const { result } = renderHook(() => useDatasetApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItem('1');
    });
    expect(result.current.getItem).toBeTruthy();
  });

  test('should call getItem with error', async () => {
    mock.onGet(new RegExp('/datasets/1')).reply(500, { error: 'error' });
    const { result } = renderHook(() => useDatasetApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItem('1');
    });
    expect(result.current.getItem).toBeTruthy();
  });
});
