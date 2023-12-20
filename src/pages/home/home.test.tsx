import { act, render } from '@testing-library/react';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/use-auth';
import { User } from '../../types/user';
import { Home } from './home';

describe('Home', () => {
  const componentWrapper = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Home />
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

  // test('should trigger button clicks', async () => {
  //   const { getAllByText } = render(componentWrapper);

  //   const button1 = getAllByText(
  //     'What intel lapses occurred, and how can they be prevented?',
  //   );
  //   const button2 = getAllByText(
  //     'Assess emergency response; suggest improvements for future catastrophic events',
  //   );
  //   const button3 = getAllByText(
  //     'Examine global collaboration post-9/11; propose measures for enhanced cooperation.',
  //   );

  //   fireEvent.click(button1[0]);
  //   expect(
  //     getAllByText(
  //       'What intel lapses occurred, and how can they be prevented?',
  //     ),
  //   ).toBeInTheDocument();
  //   fireEvent.click(button2[1]);
  //   expect(
  //     getAllByText(
  //       'Assess emergency response; suggest improvements for future catastrophic events',
  //     ),
  //   ).toBeInTheDocument();
  //   fireEvent.click(button3[2]);
  //   expect(
  //     getAllByText(
  //       'Examine global collaboration post-9/11; propose measures for enhanced cooperation.',
  //     ),
  //   ).toBeInTheDocument();
  // });
});
