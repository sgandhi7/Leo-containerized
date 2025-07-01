import { Dashboard } from '@/pages/dashboard';
import { ChakraProvider } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <RecoilRoot>
        <ChakraProvider>{ui}</ChakraProvider>
      </RecoilRoot>
    </MemoryRouter>,
  );
};

describe('Dashboard', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([]),
        }),
      ) as unknown,
    );
  });

  it('renders title and description', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/let's discover top talent/i)).toBeInTheDocument();
    expect(
      screen.getByText(/LEO helps you explore teams and positions/i),
    ).toBeInTheDocument();
  });

  it('renders all sample prompt buttons', () => {
    renderWithProviders(<Dashboard />);
    const prompts = [
      'List employees that have experience with Drupal and PHP',
      'List employees that best fit job posting SharePoint Developer 5361',
      'What job postings best fit Jorge Vasquez',
      'List employees that have experience with React and Node.js',
      'What job postings best fit Preetham Ramesh',
    ];

    prompts.forEach((prompt) => {
      expect(screen.getByText(prompt)).toBeInTheDocument();
    });
  });

  it('clicking a sample prompt button updates the search input', () => {
    renderWithProviders(<Dashboard />);
    const button = screen.getByText('What job postings best fit Jorge Vasquez');
    fireEvent.click(button);

    // Check that the search input was updated (visible via Search component)
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('What job postings best fit Jorge Vasquez');
  });
});
