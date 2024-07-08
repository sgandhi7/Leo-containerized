import React from 'react';
import { Route, Routes } from 'react-router';
import { RecoilRoot } from 'recoil';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { Home } from './pages/home/home';
import { Investigation } from './pages/investigation/investigation';
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
              <Route path="/" element={<Home />} />
              <Route path="/investigations" element={<Investigation />} />
              <Route path="/investigations/:id" element={<Investigation />} />
            </Route>
          </Routes>
        </main>
      </div>
    </RecoilRoot>
  );
};
