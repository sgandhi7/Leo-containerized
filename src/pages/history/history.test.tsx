import { investigationData } from '@src/data/investigation';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useApi from '../../hooks/use-api';
import { History } from './history';

describe('History', () => {
  const componentWrapper = (
    <RecoilRoot>
      <BrowserRouter>
        <History />
      </BrowserRouter>
    </RecoilRoot>
  );

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });

  test('renders with no data', async () => {
    jest.spyOn(useApi, 'default').mockReturnValue({
      item: undefined,
      items: undefined,
      loading: false,
      completions: [],
      error: '',
      search: jest.fn(),
      getItem: jest.fn(),
      getItems: jest.fn(),
      deleteItem: jest.fn(),
    });
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
      expect(baseElement.querySelector('#investigation-table')).toBeFalsy();
    });
  });

  test('renders with mocked data', async () => {
    jest.spyOn(useApi, 'default').mockReturnValue({
      item: undefined,
      items: investigationData,
      loading: false,
      completions: [],
      error: '',
      search: jest.fn(),
      getItem: jest.fn(),
      getItems: jest.fn(),
      deleteItem: jest.fn(),
    });
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
      expect(baseElement.querySelector('#investigation-table')).toBeTruthy();
    });
  });
});
