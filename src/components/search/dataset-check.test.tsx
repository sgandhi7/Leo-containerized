// Checkbox.test.js
import { datasets } from '@src/data/dataset';
import { fireEvent, render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as useDatasetApi from '../../hooks/use-dataset-api';
import DatasetCheck from './dataset-check';

describe('DatasetCheck', () => {
  test('renders without crashing', () => {
    jest.spyOn(useDatasetApi, 'default').mockReturnValue({
      item: undefined,
      items: datasets,
      loading: false,
      getItem: jest.fn(),
      getItems: jest.fn(),
    });

    const { getByLabelText } = render(
      <RecoilRoot>
        <DatasetCheck />
      </RecoilRoot>,
    );
    const checkbox = getByLabelText('9/11 Commission');
    expect(checkbox).toBeTruthy();
  });

  test('handles uncheck change correctly', () => {
    jest.spyOn(useDatasetApi, 'default').mockReturnValue({
      item: undefined,
      items: datasets,
      loading: false,
      getItem: jest.fn(),
      getItems: jest.fn(),
    });

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

  test('handles check change correctly', () => {
    jest.spyOn(useDatasetApi, 'default').mockReturnValue({
      item: undefined,
      items: datasets,
      loading: false,
      getItem: jest.fn(),
      getItems: jest.fn(),
    });

    const { getByLabelText } = render(
      <RecoilRoot>
        <DatasetCheck />
      </RecoilRoot>,
    );
    const checkbox = getByLabelText('GDELT') as HTMLInputElement;

    // Uncheck the checkbox
    fireEvent.click(checkbox);

    // Verify that the checkbox is checked
    expect(checkbox.checked).toEqual(true);
  });
});
