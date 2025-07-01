import { MsalProvider } from '@azure/msal-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { App } from './App.tsx';
import { Provider } from './components/ui/provider';
import './styles.scss';
import msalInstance from './utils/msal.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <MsalProvider instance={msalInstance}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </MsalProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
