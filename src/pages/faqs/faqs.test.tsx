import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { FAQs } from './faqs';

describe('FAQs', () => {
  const componentWrapper = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <FAQs />
        </BrowserRouter>
      </RecoilRoot>
    </AuthProvider>
  );

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });
});
