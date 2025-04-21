import { fireEvent, render, screen } from '@testing-library/react';
import Switch from './Switch';

describe('Switch component', () => {
  it('renders the switch and sets its checked state correctly', () => {
    render(<Switch isOn={true} handleToggle={jest.fn()} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('renders the switch unchecked when isOn is false', () => {
    render(<Switch isOn={false} handleToggle={jest.fn()} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('calls handleToggle when clicked', () => {
    const handleToggle = jest.fn();
    render(<Switch isOn={false} handleToggle={handleToggle} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
