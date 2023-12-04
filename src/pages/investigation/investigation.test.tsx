import useApi, * as ApiHook from '@src/hooks/use-api';
import { act, render, waitFor } from '@testing-library/react';
import { AuthProvider } from 'react-oidc-context';
import * as RouterDom from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Investigation } from './investigation';

jest.mock('@src/hooks/use-api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Investigation', () => {
  const componentWrapper = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Investigation />
        </BrowserRouter>
      </RecoilRoot>
    </AuthProvider>
  );

  beforeEach(() => {
    (RouterDom.useParams as jest.Mock).mockReturnValue({ id: 'testId' });
    (ApiHook.useApi as jest.Mock).mockReturnValue({
      getItem: jest.fn(),
      item: null,
      loading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ... rest of your tests

  test('renders without crashing', () => {
    render(
      <RecoilRoot>
        <Investigation />
      </RecoilRoot>,
    );
  });

  test('calls getItem when id is present', async () => {
    const getItem = jest.fn();
    useApi.mockReturnValue({
      getItem,
      item: null,
      loading: false,
    });

    act(() => {
      render(
        <RecoilRoot>
          <Investigation />
        </RecoilRoot>,
      );
    });

    await waitFor(() => expect(getItem).toHaveBeenCalledWith('testId'));
  });

  test('sets current investigation when item is present', async () => {
    useApi.mockReturnValue({
      getItem: jest.fn(),
      items: null,
      loading: false,
      completions: undefined,
    });
  });

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });
});
