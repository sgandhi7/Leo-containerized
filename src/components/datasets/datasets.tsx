import useDatasetApi from '@src/hooks/use-dataset-api';
import { Dataset } from '@src/types/dataset';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentDataset as defaultDataset } from '../../store';

export default function Datasets() {
  const { getItems, items } = useDatasetApi();
  const [currentDataset, setCurrentDataset] =
    useRecoilState<string[]>(defaultDataset);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const newValues = [...currentDataset];
    if (checked) {
      newValues.push(value);
    } else {
      const index = newValues.indexOf(value);
      if (index > -1) {
        newValues.splice(index, 1);
      }
    }
    setCurrentDataset(newValues);
  };

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    if (items && items.length > 0) {
      setCurrentDataset([items[0].value]);
    }
  }, [items, setCurrentDataset]);

  return (
    <div
      id="story--uswds-forms-checkbox--standard--primary-inner"
      data-name="Standard"
      className="display-flex flex-column datasets"
    >
      {items ? (
        items
          .filter((item: Dataset) => item.is_active)
          .map((dataset: Dataset) => (
            <div
              key={`checkbox${dataset.id}`}
              className="usa-checkbox margin-x-1 margin-bottom-1"
            >
              <input
                className="usa-checkbox__input"
                id={`checkbox${dataset.id}__usa-checkbox__input`}
                type="checkbox"
                name={`checkbox${dataset.id}`}
                value={`${dataset.value}`}
                checked={currentDataset.includes(dataset.value)}
                onChange={handleCheckboxChange}
              />
              <label
                className="usa-checkbox__label"
                htmlFor={`checkbox${dataset.id}__usa-checkbox__input`}
              >
                {dataset.display_name}
              </label>
            </div>
          ))
      ) : (
        <></>
      )}
    </div>
  );
}
