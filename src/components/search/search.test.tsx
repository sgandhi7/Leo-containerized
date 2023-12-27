import { act, fireEvent, render } from '@testing-library/react';

import { completionData } from '@src/data/investigation';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useApi from '../../hooks/use-api';
import { currentDataset as defaultDataset } from '../../store';
import { Search } from './search';

describe('Search', () => {
  const setSearchInput = jest.fn();
  const componentWrapper = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Search searchInput={''} setSearchInput={setSearchInput} />
        </BrowserRouter>
      </RecoilRoot>
    </AuthProvider>
  );

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });

  test('renders Search component and checks input change', async () => {
    const setSearchInput = jest.fn();
    const { getByRole } = render(
      <AuthProvider>
        <RecoilRoot>
          <BrowserRouter>
            <Search searchInput="" setSearchInput={setSearchInput} />
          </BrowserRouter>
        </RecoilRoot>
      </AuthProvider>,
    );

    const searchInput = getByRole('textbox');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test' } });
    });

    expect(setSearchInput).toHaveBeenCalledWith('test');
  });

  test('submits a search with no data', async () => {
    jest.spyOn(useApi, 'default').mockReturnValue({
      item: undefined,
      items: undefined,
      loading: false,
      completions: [],
      error: '',
      search: jest.fn().mockResolvedValue({ data: { results: [] } }),
      getItem: jest.fn(),
      getItems: jest.fn(),
    });
    const { getByRole } = render(componentWrapper);

    const searchInput = getByRole('textbox');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test' } });
    });
    const searchButton = getByRole('button');
    await act(async () => {
      fireEvent.click(searchButton);
    });
  });

  test('submits a search with keypress', async () => {
    jest.spyOn(useApi, 'default').mockReturnValue({
      item: undefined,
      items: undefined,
      loading: false,
      completions: [],
      error: '',
      search: jest.fn().mockResolvedValue({ data: { results: [] } }),
      getItem: jest.fn(),
      getItems: jest.fn(),
    });
    const { getByRole } = render(
      <AuthProvider>
        <RecoilRoot
          initializeState={(state) => state.set(defaultDataset, 'document')}
        >
          <BrowserRouter>
            <Search searchInput={'test'} setSearchInput={setSearchInput} />
          </BrowserRouter>
        </RecoilRoot>
      </AuthProvider>,
    );

    const searchInput = getByRole('textbox');
    await act(async () => {
      fireEvent.keyUp(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });
  });

  test('submits a new search with button', async () => {
    jest.spyOn(useApi, 'default').mockReturnValue({
      item: undefined,
      items: undefined,
      loading: false,
      completions: [],
      error: '',
      search: jest
        .fn()
        .mockResolvedValue({ data: { results: completionData } }),
      getItem: jest.fn(),
      getItems: jest.fn(),
    });
    const { getByRole } = render(
      <AuthProvider>
        <RecoilRoot
          initializeState={(state) => state.set(defaultDataset, 'document')}
        >
          <BrowserRouter>
            <Search searchInput={'test'} setSearchInput={setSearchInput} />
          </BrowserRouter>
        </RecoilRoot>
      </AuthProvider>,
    );

    const searchButton = getByRole('button');
    await act(async () => {
      fireEvent.click(searchButton);
    });
  });
});
