import { InteractionStatus } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import useAuth from './hooks/use-auth';
import { Chat } from './pages/chat/chat';

export const App = (): React.ReactElement => {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  useEffect(() => {
    if (inProgress === InteractionStatus.None && !isAuthenticated) {
      signIn();
    }
  }, [inProgress, isAuthenticated, navigate, signIn]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <main id="mainSection" className="usa-section">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </main>
    </div>
  );
};
