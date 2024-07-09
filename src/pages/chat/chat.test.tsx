import { act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Chat } from './chat';

describe('Chat', () => {
  const componentWrapper = (
    <RecoilRoot>
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    </RecoilRoot>
  );

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  });

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });
});
