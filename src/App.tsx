import { InteractionStatus } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Sidebar } from './components/sidebar/sidebar';
import { Topbar } from './components/sidebar/topbar';
import { Investigation } from './pages/chatwindow';
import { Dashboard } from './pages/dashboard';
import { Examples } from './pages/examples';
import { Faqs } from './pages/faqs';
import { History } from './pages/history';
import { SignIn } from './pages/sign-in';
import { currentUserState } from './store';
import { User } from './types/user';

export const App = (): React.ReactElement => {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const location = useLocation(); // 👈 get current route
  const [user] = useRecoilState<User | null | undefined>(currentUserState);

  const bg = useColorModeValue('gray.50', 'gray.900');

  const isChat = location.pathname === '/session'; // 👈 check if on chat page

  useEffect(() => {
    if (
      !isAuthenticated &&
      inProgress === InteractionStatus.None &&
      user === undefined &&
      window.location.pathname !== '/login'
    ) {
      navigate('/login');
    }
    console.log('isAuthenticated: ', isAuthenticated);
  }, [inProgress, isAuthenticated, navigate, user]);

  return (
    <Box bg={bg} minH="100vh" display="flex" flexDirection="row">
      {isAuthenticated ? (
        <>
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>

          <div className="topbar-wrapper">
            <Topbar />
          </div>

          <main
            id="mainSection"
            className={`usa-section ${isChat ? 'chat-page' : ''}`}
            //no outer scrolling in the chatwindow page, but ensures outer scrolling everywhere else
            style={{
              flex: 1,
              height: '100vh',
              overflowY: isChat ? 'hidden' : 'auto',
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/session" element={<Investigation />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/examples" element={<Examples />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      )}
    </Box>
  );
};
