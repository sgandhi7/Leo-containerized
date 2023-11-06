import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ProfileAvatar } from './profile-avatar';

describe('ProfileAvatar', () => {
  test('renders with the correct props', () => {
    const props = {
      src: 'test-src',
      round: 'test-round',
      size: 'test-size',
      style: { color: 'red' },
    };

    render(<ProfileAvatar {...props} />);

    const avatar = screen.getByRole('img', { name: 'Profile Avatar' });
    expect(avatar).toHaveAttribute('src', props.src);
    expect(avatar).toHaveAttribute('round', props.round);
    expect(avatar).toHaveAttribute('size', props.size);
    expect(avatar).toHaveStyle('color: red');
  });
});
