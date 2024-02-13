import { render } from '@testing-library/react';

import { User } from '@src/types/user';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/use-auth';
import { Filters } from './filters';

describe('Filters', () => {
  test('should render successfully', () => {
    const { baseElement } = render(
      <AuthProvider>
        <RecoilRoot>
          <BrowserRouter>
            <Filters />
          </BrowserRouter>
        </RecoilRoot>
      </AuthProvider>,
    );

    expect(baseElement).toBeTruthy();
  });

  test('should render with mocked user', () => {
    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    const { baseElement } = render(
      <AuthProvider>
        <RecoilRoot>
          <BrowserRouter>
            <Filters />
          </BrowserRouter>
        </RecoilRoot>
      </AuthProvider>,
    );

    expect(baseElement).toBeTruthy();
  });
});
