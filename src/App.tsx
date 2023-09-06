import React from 'react';
import { Route, Routes } from 'react-router';
import { RecoilRoot } from 'recoil';
import { Header } from './components/header/header';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { Home } from './pages/home/home';
import { Investigations } from './pages/investigations/investigations';
import { SignIn } from './pages/sign-in/sign-in';

export const App = (): React.ReactElement => (
  <RecoilRoot>
    <div>
      <Header />
      <main id="mainSection" className="usa-section">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/investigations" element={<Investigations />} />
          </Route>
        </Routes>
      </main>
    </div>
  </RecoilRoot>
);
