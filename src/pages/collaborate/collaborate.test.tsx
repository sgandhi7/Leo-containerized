import { act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Collaborate } from './collaborate';

describe('Search', () => {
  const componentWrapper = (
    <RecoilRoot>
      <BrowserRouter>
        <Collaborate />
      </BrowserRouter>
    </RecoilRoot>
  );

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });
});
