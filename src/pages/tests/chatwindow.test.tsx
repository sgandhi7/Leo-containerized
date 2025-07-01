import { Investigation } from '@/pages/chatwindow';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock for getApiBaseUrl
vi.mock('@/utils/env', async () => {
  const actual = await vi.importActual<Record<string, unknown>>('@/utils/env');
  return {
    ...actual,
    getApiBaseUrl: () => 'http://localhost:8080',
  };
});

// Mock for useApi hook
vi.mock('@/hooks/use-api', () => ({
  default: () => ({
    getItem: vi.fn(),
    item: null,
  }),
}));

describe('Investigation Component', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <RecoilRoot>
          <Investigation />
        </RecoilRoot>
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing and shows basic layout', () => {
    renderComponent();
    expect(screen.getByText(/leo can make mistakes/i)).toBeInTheDocument();
  });

  it('displays lock icon', () => {
    renderComponent();
    expect(screen.getByAltText('Lock Icon')).toBeInTheDocument();
  });

  it('renders search input component', () => {
    renderComponent();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('handles empty prompt list without crashing', () => {
    renderComponent();
    expect(screen.getByText(/leo can make mistakes/i)).toBeTruthy();
  });
});
