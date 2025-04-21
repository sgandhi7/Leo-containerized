import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Investigation } from '../pages/chatwindow';

jest.mock('../utils/env', () => ({
  getApiBaseUrl: () => 'https://mock-api-url.com',
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  }),
) as jest.Mock;

describe('Investigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.sessionStorage.clear();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <RecoilRoot>
          <Investigation />
        </RecoilRoot>
      </MemoryRouter>,
    );

  test('renders New Chat button', () => {
    renderComponent();
    expect(
      screen.getByRole('button', { name: /New Chat/i }),
    ).toBeInTheDocument();
  });

  test('clears session storage and prompts when clicking New Chat', () => {
    window.sessionStorage.setItem('chat_history', 'some-history');
    renderComponent();
    const button = screen.getByRole('button', { name: /New Chat/i });
    fireEvent.click(button);
    expect(window.sessionStorage.getItem('chat_history')).toBeNull();
  });

  test('calls fetch when isTypingComplete becomes true', async () => {
    renderComponent();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
