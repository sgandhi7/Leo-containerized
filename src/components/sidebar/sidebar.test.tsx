import { render } from '@testing-library/react';

import { User } from '@src/types/user';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/use-auth';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  test('should render successfully', () => {
    const { baseElement } = render(
      <AuthProvider>
        <RecoilRoot>
          <BrowserRouter>
            <Sidebar />
          </BrowserRouter>
        </RecoilRoot>
      </AuthProvider>,
    );

    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector('nav')).toBeDefined();
  });

  test('should navigate away from home', async () => {
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
            <Sidebar />
          </BrowserRouter>
        </RecoilRoot>
      </AuthProvider>,
    );

    const historyBtn = baseElement.querySelector(
      '#history-btn',
    ) as HTMLButtonElement;
    if (historyBtn) {
      await userEvent.click(historyBtn);
      expect(window.location.pathname).toBe('/history');
    }

    const faqsBtn = baseElement.querySelector('#faqs-btn') as HTMLButtonElement;
    if (faqsBtn) {
      await userEvent.click(faqsBtn);
      expect(window.location.pathname).toBe('/faqs');
    }
  });
});
