import { render } from '@testing-library/react';

import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Filters } from './filters';

describe('Filters', () => {
  test('should render successfully', () => {
    const { baseElement } = render(
      <AuthProvider>
        <RecoilRoot>
          <BrowserRouter>
            <Filters />
          </BrowserRouter>
        </RecoilRoot>
      </AuthProvider>,
    );

    expect(baseElement).toBeTruthy();
  });
});
