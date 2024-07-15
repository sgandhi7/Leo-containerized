import React from 'react';
import { Route, Routes } from 'react-router';
import { RecoilRoot } from 'recoil';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { Chat } from './pages/chat/chat';
import { SignIn } from './pages/sign-in/sign-in';
import { SignOut } from './pages/sign-out/sign-out';

export const App = (): React.ReactElement => {
  return (
    <RecoilRoot>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <main id="mainSection" className="usa-section">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signout" element={<SignOut />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Chat />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:id" element={<Chat />} />
            </Route>
          </Routes>
        </main>
      </div>
    </RecoilRoot>
  );
};
