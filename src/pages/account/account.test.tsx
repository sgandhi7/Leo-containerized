import { render, screen } from '@testing-library/react';
import { Account } from './account';

describe('Account component', () => {
  test('should render the account heading', () => {
    render(<Account />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Account');
  });
});
