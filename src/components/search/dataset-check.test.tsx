// Checkbox.test.js
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import DatasetCheck from './dataset-check';

describe('DatasetCheck', () => {
  test('renders without crashing', () => {
    const { getByLabelText } = render(<DatasetCheck />);
    const checkbox = getByLabelText('9/11 Commission');
    expect(checkbox).toBeInTheDocument();
  });

  test('handles checkbox change correctly', () => {
    const { getByLabelText } = render(<DatasetCheck />);
    const checkbox = getByLabelText('9/11 Commission') as HTMLInputElement;

    // Uncheck the checkbox
    fireEvent.click(checkbox);

    // Verify that the checkbox is unchecked
    expect(checkbox.checked).toEqual(false);
  });
});
