import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Search } from '../pages/chat';

jest.mock('../utils/env', () => ({
  getApiBaseUrl: () => 'https://mock-api-url.com',
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        jsonData: [],
        names: ['Alice Johnson'],
        emails: ['alice@company.com'],
      }),
  }),
) as jest.Mock;

test('this should fail', () => {
  throw new Error('Failing on purpose');
});

describe('Search Component', () => {
  const setSearchInput = jest.fn();
  expect(true).toBe(false);
  const renderSearch = (input = '') =>
    render(
      <MemoryRouter>
        <RecoilRoot>
          <Search searchInput={input} setSearchInput={setSearchInput} />
        </RecoilRoot>
      </MemoryRouter>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the text input area', () => {
    renderSearch('test');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('updates input on change', () => {
    renderSearch();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(setSearchInput).toHaveBeenCalledWith('hello world');
  });

  test('calls submitSearch on Enter keyup', () => {
    renderSearch('test input');
    const input = screen.getByRole('textbox');
    fireEvent.keyUp(input, { key: 'Enter', shiftKey: false });
    // We can't directly test submitSearch here unless we mock it
    // So we just verify no crash or error and that setSearchInput would've cleared after fetch
  });

  test('displays dropdown when "/" is typed', async () => {
    renderSearch('');
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '/a' } });

    await waitFor(() => {
      expect(screen.getByText('People')).toBeInTheDocument();
      expect(screen.getByText('Jobs')).toBeInTheDocument();
    });
  });
});
