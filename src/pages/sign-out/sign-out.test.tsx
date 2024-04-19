import { act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import { SignOut } from './sign-out';

describe('SignOut', () => {
  const signInComponent = (
    <RecoilRoot>
      <BrowserRouter>
        <SignOut />
      </BrowserRouter>
    </RecoilRoot>
  );

  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  test('should render successfully', async () => {
    const { baseElement } = render(signInComponent);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });
});
