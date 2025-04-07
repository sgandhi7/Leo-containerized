import { InteractionStatus } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Investigation } from './pages/chatwindow';
import { Dashboard } from './pages/dashboard';
import { Examples } from './pages/examples';
import { Faqs } from './pages/faqs';
import { History } from './pages/history';
import { SignIn } from './pages/sign-in';
import { currentUserState } from './store';
import { User } from './types/user';

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const prefersDarkMode = localStorage.getItem('prefersDarkMode');
let modePref = defaultDark;
if (prefersDarkMode) {
  modePref = prefersDarkMode === 'true';
}
document.documentElement.setAttribute(
  'data-theme',
  modePref ? 'dark' : 'light',
);

export const App = (): React.ReactElement => {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const [user] = useRecoilState<User | undefined>(currentUserState);

  useEffect(() => {
    if (
      !isAuthenticated &&
      inProgress === InteractionStatus.None &&
      user === undefined
    ) {
      navigate('/login');
    }
    console.log('isAuthenticated: ', isAuthenticated);
  }, [inProgress, isAuthenticated, navigate, user]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {isAuthenticated ? (
        <main id="mainSection" className="usa-section">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/session" element={<Investigation />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      ) : (
        <Routes>
          <Route path="/login" element={<SignIn />} />
        </Routes>
      )}
    </div>
  );
};
