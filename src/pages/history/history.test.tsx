import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { History } from './history';
// Mock the useApi hook
jest.mock('@src/hooks/use-api', () => ({
  useApi: () => ({
    getItems: jest.fn(),
    items: {
      items: [
        {
          id: 1,
          name: 'Test Investigation',
          created: new Date().toISOString(),
          createdBy: 'John Doe',
          status: 'Active',
          prompts: [],
        },
      ],
    },
  }),
}));

describe('History', () => {
  const componentWrapper = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <History />
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

  test('displays investigation data in the table', () => {
    render(<History />);

    test('displays the Share button', () => {
      render(<History />);
      expect(screen.getByText('Share')).toBeInTheDocument();
    });
  });

  test('displays the Share button', () => {
    render(<History />);
    expect(screen.getByText('Share')).toBeInTheDocument();
  });
});
