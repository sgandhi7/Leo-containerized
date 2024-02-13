// Checkbox.test.js
import { fireEvent, render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import MediaTypes from './media-types';

describe('MediaTypes', () => {
  test('renders successfully', () => {
    const { getByLabelText } = render(
      <RecoilRoot>
        <MediaTypes />
      </RecoilRoot>,
    );
    const checkbox = getByLabelText('PDF');
    expect(checkbox).toBeTruthy();
  });

  test('handles uncheck change correctly', () => {
    const { getByLabelText } = render(
      <RecoilRoot>
        <MediaTypes />
      </RecoilRoot>,
    );
    const checkbox = getByLabelText('PDF') as HTMLInputElement;

    // Uncheck the checkbox
    fireEvent.click(checkbox);

    // Verify that the checkbox is unchecked
    expect(checkbox.checked).toEqual(false);
  });

  test('handles check change correctly', () => {
    const { getByLabelText } = render(
      <RecoilRoot>
        <MediaTypes />
      </RecoilRoot>,
    );
    const checkbox = getByLabelText('Audio') as HTMLInputElement;

    // Uncheck the checkbox
    fireEvent.click(checkbox);

    // Verify that the checkbox is checked
    expect(checkbox.checked).toEqual(true);
  });
});
