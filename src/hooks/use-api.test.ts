import { investigationData } from '@src/data/investigation';
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
      result.current.search('test', 'document', []);
    });
    expect(result.current.search).toBeTruthy();
  });

  test('should call getItems successfully', async () => {
    mock.onGet(new RegExp('/investigations')).reply(200, { results: [] });
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItems();
    });
    expect(result.current.getItems).toBeTruthy();
  });

  test('should call getItems successfully with data', async () => {
    mock
      .onGet(new RegExp('/investigations'))
      .reply(200, { results: investigationData });
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItems();
    });
    expect(result.current.getItems).toBeTruthy();
  });

  test('should call getItems with error', async () => {
    mock.onGet(new RegExp('/investigations')).reply(500, { error: 'error' });
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItems();
    });
    expect(result.current.getItems).toBeTruthy();
  });

  test('should call getItem successfully', async () => {
    mock.onGet(new RegExp('/investigations/1')).reply(200, null);
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItem('1');
    });
    expect(result.current.getItem).toBeTruthy();
  });

  test('should call getItem successfully with data', async () => {
    mock
      .onGet(new RegExp('/investigations/1'))
      .reply(200, investigationData[0]);
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItem('1');
    });
    expect(result.current.getItem).toBeTruthy();
  });

  test('should call getItem with error', async () => {
    mock.onGet(new RegExp('/investigations/1')).reply(500, { error: 'error' });
    const { result } = renderHook(() => useApi(), {
      wrapper: RecoilRoot,
    });

    await act(async () => {
      result.current.getItem('1');
    });
    expect(result.current.getItem).toBeTruthy();
  });
});
