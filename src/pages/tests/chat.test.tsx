import { Search } from '@/pages/chat';
import { ChakraProvider } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { describe, expect, it } from 'vitest';

const renderSearch = () => {
  const Wrapper = () => {
    const [searchInput, setSearchInput] = useState('');
    return (
      <MemoryRouter>
        <RecoilRoot>
          <ChakraProvider>
            <Search searchInput={searchInput} setSearchInput={setSearchInput} />
          </ChakraProvider>
        </RecoilRoot>
      </MemoryRouter>
    );
  };

  render(<Wrapper />);
};

describe('Search component', () => {
  it('updates input value when typed into', () => {
    renderSearch();
    const input = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: 'Test query' } });
    expect(input.value).toBe('Test query'); // ✅ should now work
  });

  it('updates input value when typed into', () => {
    renderSearch();
    const input = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: 'Test query' } });
    expect(input.value).toBe('Test query');
  });

  it('shows dropdown when user types "/"', () => {
    renderSearch();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '/John' } });
    expect(screen.getByText(/people/i)).toBeInTheDocument(); // dropdown tab
  });
});
