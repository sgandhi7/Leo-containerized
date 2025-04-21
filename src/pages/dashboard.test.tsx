jest.mock('../utils/env', () => ({
  getApiBaseUrl: () => 'https://mock-api-url.com',
}));

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Dashboard } from '../pages/dashboard';

// Mock fetch
globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        JSON.stringify({
          Name: 'session1',
          Content: {
            prompts: [],
            chatHistory: [],
          },
        }),
      ]),
  }),
) as jest.Mock;

// Helper to render Dashboard with required context
const renderDashboard = () => {
  return render(
    <MemoryRouter>
      <RecoilRoot>
        <Dashboard />
      </RecoilRoot>
    </MemoryRouter>,
  );
};

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the title 'Let's Discover Top Talent'", () => {
    renderDashboard();
    expect(screen.getByText(/Let's Discover Top Talent/i)).toBeInTheDocument();
  });

  test('updates search input when Drupal button is clicked', () => {
    renderDashboard();
    const button = screen.getByText(
      /List employees that have experience with Drupal and PHP/i,
    );
    fireEvent.click(button);

    expect(screen.getByRole('textbox')).toHaveValue(
      'List employees that have experience with Drupal and PHP',
    );
  });

  test('updates search input when SharePoint button is clicked', () => {
    renderDashboard();
    const button = screen.getByText(
      /List employees that best fit job posting SharePoint Developer 5361/i,
    );
    fireEvent.click(button);

    expect(screen.getByRole('textbox')).toHaveValue(
      'List employees that best fit job posting SharePoint Developer 5361',
    );
  });

  test('updates search input when Jorge button is clicked', () => {
    renderDashboard();
    const button = screen.getByText(
      /What job postings best fit Jorge Vasquez/i,
    );
    fireEvent.click(button);

    expect(screen.getByRole('textbox')).toHaveValue(
      'What job postings best fit Jorge Vasquez',
    );
  });

  test('calls fetchSessions on mount if sessions are undefined', async () => {
    renderDashboard();

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalled(); // more flexible than `.toHaveBeenCalledTimes(1)`
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/fetchSessions'),
      expect.objectContaining({
        method: 'POST',
      }),
    );
  });
});
