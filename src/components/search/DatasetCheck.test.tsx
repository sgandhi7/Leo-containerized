// Checkbox.test.js
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import DatasetCheck from './DatasetCheck';

describe('DatasetCheck', () => {
  it('renders without crashing', () => {
    const { getByLabelText } = render(<DatasetCheck />);
    const checkbox = getByLabelText('9/11 Commission');
    expect(checkbox).toBeInTheDocument();
  });

  it('handles checkbox change correctly', () => {
    const { getByLabelText } = render(<DatasetCheck />);
    const checkbox = getByLabelText('9/11 Commission') as HTMLInputElement;

    // Check the checkbox
    fireEvent.click(checkbox);

    // Verify that the checkbox is checked
    expect(checkbox.checked).toEqual(true);

    // Uncheck the checkbox
    fireEvent.click(checkbox);

    // Verify that the checkbox is unchecked
    expect(checkbox.checked).toEqual(false);
  });
});
