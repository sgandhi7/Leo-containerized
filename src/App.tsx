import React from 'react';
import { Route, Routes } from 'react-router';
import { RecoilRoot } from 'recoil';
import { Header } from './components/header/header';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { Account } from './pages/account/account';
import { Collaborate } from './pages/collaborate/collaborate';
import { History } from './pages/history/history';
import { Home } from './pages/home/home';
import { Investigation } from './pages/investigation/investigation';
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
            <Route path="/history" element={<History />} />
            <Route path="/account" element={<Account />} />
            <Route path="/collaborate" element={<Collaborate />} />
            <Route path="/investigations" element={<Investigation />} />
            <Route path="/investigations/:id" element={<Investigation />} />
          </Route>
        </Routes>
      </main>
    </div>
  </RecoilRoot>
);
