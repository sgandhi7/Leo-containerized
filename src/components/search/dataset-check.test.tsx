// Checkbox.test.js
import { fireEvent, render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import DatasetCheck from './dataset-check';

describe('DatasetCheck', () => {
  test('renders without crashing', () => {
    const { getByLabelText } = render(
      <RecoilRoot>
        <DatasetCheck />
      </RecoilRoot>,
    );
    const checkbox = getByLabelText('9/11 Commission');
    expect(checkbox).toBeTruthy();
  });

  test('handles checkbox change correctly', () => {
    const { getByLabelText } = render(
      <RecoilRoot>
        <DatasetCheck />
      </RecoilRoot>,
    );
    const checkbox = getByLabelText('9/11 Commission') as HTMLInputElement;

    // Uncheck the checkbox
    fireEvent.click(checkbox);

    // Verify that the checkbox is unchecked
    expect(checkbox.checked).toEqual(false);
  });
});
