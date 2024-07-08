import { MsalProvider } from '@azure/msal-react';
import msalInstance from '@src/utils/msal';
import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useApi from '../../hooks/use-api';
import * as useAuthMock from '../../hooks/use-auth';
import { User } from '../../types/user';
import { Home } from './home';

describe('Home', () => {
  const componentWrapper = (
    <MsalProvider instance={msalInstance}>
      <RecoilRoot>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </RecoilRoot>
    </MsalProvider>
  );

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });

  test('should render with mock data', async () => {
    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      currentUserData: { firstName: 'John', lastName: 'Doe' } as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });

  test('submits a search with helper button', async () => {
    jest.spyOn(useApi, 'default').mockReturnValue({
      loading: false,
      completions: [],
      error: '',
      search: jest.fn().mockResolvedValue({ data: { results: [] } }),
    });

    const { baseElement } = render(componentWrapper);

    const helperButton = baseElement.querySelector(
      'button.helper-button',
    ) as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(helperButton);
    });

    const searchButton = baseElement.querySelector(
      'button.search-input',
    ) as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(searchButton);
    });
  });
});
