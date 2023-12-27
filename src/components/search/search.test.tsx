import { act, fireEvent, render } from '@testing-library/react';

import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Search } from './search';

describe('Search', () => {
  const setSearchInput = jest.fn();
  const componentWrapper = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Search searchInput={''} setSearchInput={setSearchInput} />
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

  test('renders Search component and checks input change', async () => {
    const setSearchInput = jest.fn();
    const { getByRole } = render(
      <AuthProvider>
        <RecoilRoot>
          <BrowserRouter>
            <Search searchInput="" setSearchInput={setSearchInput} />
          </BrowserRouter>
        </RecoilRoot>
      </AuthProvider>,
    );

    const searchInput = getByRole('textbox');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test' } });
    });

    expect(setSearchInput).toHaveBeenCalledWith('test');
  });
});
