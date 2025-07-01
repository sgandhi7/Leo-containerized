import { APP_TITLE } from '@/utils/constants';
import { ChakraProvider } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Topbar from '../sidebar/topbar';

const renderWithRoutes = () => {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Topbar />} />
          <Route path="/history" element={<div>History Page</div>} />
          <Route path="/faqs" element={<div>FAQs Page</div>} />
        </Routes>
      </ChakraProvider>
    </MemoryRouter>,
  );
};

describe('Topbar', () => {
  it('renders app title and logo', () => {
    renderWithRoutes();
    expect(screen.getByText(APP_TITLE)).toBeInTheDocument();
    expect(screen.getByAltText('Leo Logo')).toBeInTheDocument();
  });

  it('navigates to /history when History button is clicked', () => {
    renderWithRoutes();
    fireEvent.click(screen.getByText(/history/i));
    expect(screen.getByText(/history page/i)).toBeInTheDocument(); // ✅ Correct assertion
  });

  it('navigates to /faqs when FAQ button is clicked', () => {
    renderWithRoutes();
    fireEvent.click(screen.getByText(/faq/i));
    expect(screen.getByText(/faqs page/i)).toBeInTheDocument(); // ✅ Correct assertion
  });

  it('opens feedback link in new tab', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    renderWithRoutes();
    fireEvent.click(screen.getByText(/feedback/i));
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('loop.cloud.microsoft'),
      '_blank',
    );
    openSpy.mockRestore();
  });
});
