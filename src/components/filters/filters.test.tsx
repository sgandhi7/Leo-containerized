import { render } from '@testing-library/react';

import { User } from '@src/types/user';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/use-auth';
import { Filters } from './filters';

describe('Filters', () => {
  test('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <Filters />
        </BrowserRouter>
      </RecoilRoot>,
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
      <RecoilRoot>
        <BrowserRouter>
          <Filters />
        </BrowserRouter>
      </RecoilRoot>,
    );

    expect(baseElement).toBeTruthy();
  });
});
