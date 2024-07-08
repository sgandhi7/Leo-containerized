import { act, fireEvent, render } from '@testing-library/react';

import { completionData } from '@src/data/investigation';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useApi from '../../hooks/use-api';
import { currentDataset as defaultDataset } from '../../store';
import { Search } from './search';

describe('Search', () => {
  const setSearchInput = jest.fn();
  const componentWrapper = (
    <RecoilRoot>
      <BrowserRouter>
        <Search searchInput={''} setSearchInput={setSearchInput} />
      </BrowserRouter>
    </RecoilRoot>
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
      <RecoilRoot>
        <BrowserRouter>
          <Search searchInput="" setSearchInput={setSearchInput} />
        </BrowserRouter>
      </RecoilRoot>,
    );

    const searchInput = getByRole('textbox');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test' } });
    });

    expect(setSearchInput).toHaveBeenCalledWith('test');
  });

  test('submits a search with no data', async () => {
    jest.spyOn(useApi, 'default').mockReturnValue({
      loading: false,
      completions: [],
      error: '',
      search: jest.fn().mockResolvedValue({ data: { results: [] } }),
    });
    const { getByRole, getAllByRole } = render(componentWrapper);

    const searchInput = getByRole('textbox');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test' } });
    });
    const searchButtons = getAllByRole('button');
    await act(async () => {
      fireEvent.click(searchButtons[0]);
    });
  });

  test('submits a search with keypress', async () => {
    jest.spyOn(useApi, 'default').mockReturnValue({
      loading: false,
      completions: [],
      error: '',
      search: jest.fn().mockResolvedValue({ data: { results: [] } }),
    });
    const { getByRole } = render(
      <RecoilRoot
        initializeState={(state) => state.set(defaultDataset, ['document'])}
      >
        <BrowserRouter>
          <Search searchInput={'test'} setSearchInput={setSearchInput} />
        </BrowserRouter>
      </RecoilRoot>,
    );

    const searchInput = getByRole('textbox');
    await act(async () => {
      fireEvent.keyUp(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    });
  });

  test('submits a new search with button', async () => {
    jest.spyOn(useApi, 'default').mockReturnValue({
      loading: false,
      completions: [],
      error: '',
      search: jest
        .fn()
        .mockResolvedValue({ data: { results: completionData } }),
    });
    const { getAllByRole } = render(
      <RecoilRoot
        initializeState={(state) => state.set(defaultDataset, ['document'])}
      >
        <BrowserRouter>
          <Search searchInput={'test'} setSearchInput={setSearchInput} />
        </BrowserRouter>
      </RecoilRoot>,
    );

    const searchButton = getAllByRole('button');
    await act(async () => {
      fireEvent.click(searchButton[0]);
    });
  });
});
