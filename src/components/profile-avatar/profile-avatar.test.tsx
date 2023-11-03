import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ProfileAvatar } from './profile-avatar';

test('renders the correct image', () => {
  render(
    <ProfileAvatar
      src="test-image.jpg"
      round="50%"
      size="50px"
      style={{ border: '1px solid black' }}
    />,
  );
  const avatar = screen.getByRole('img');
  expect(avatar).toHaveAttribute('src', 'test-image.jpg');
});

test('applies the correct size', () => {
  render(
    <ProfileAvatar
      src="test-image.jpg"
      round="50%"
      size="50px"
      style={{ border: '1px solid black' }}
    />,
  );
  const avatar = screen.getByRole('img');
  expect(avatar).toHaveStyle('width: 50px');
  expect(avatar).toHaveStyle('height: 50px');
});

test('applies the right roundness', () => {
  render(
    <ProfileAvatar
      src="test-image.jpg"
      round="50%"
      size="50px"
      style={{ border: '1px solid black' }}
    />,
  );
  const avatar = screen.getByRole('img');
  expect(avatar).toHaveAttribute('round', '50%');
});
test('applies the correct style', () => {
  render(
    <ProfileAvatar
      src="test-image.jpg"
      round="50%"
      size="50px"
      style={{ border: '1px solid black' }}
    />,
  );
  const avatar = screen.getByRole('img');
  expect(avatar).toHaveStyle('border: 1px solid black');
});
