import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentDataset as defaultDataset } from '../../store';

export default function DatasetCheck() {
  const [checkbox, setCheckboxes] = useState({
    checkbox1: true,
    checkbox2: false,
  });
  const [, setCurrentDataset] = useRecoilState<string>(defaultDataset);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const datasets = new Set<string>();
    if (checkbox.checkbox1) {
      datasets.add('document');
    }
    if (checkbox.checkbox2) {
      datasets.add('gdelt');
    }
    setCurrentDataset(datasets.size > 0 ? [...datasets].join(',') : '');
  }, [checkbox, setCurrentDataset]);

  return (
    <div
      id="story--uswds-forms-checkbox--standard--primary-inner"
      data-name="Standard"
      className="grid-row flex-justify-center datasets"
    >
      <div>
        <p className="text-uppercase">Datasets: </p>
      </div>
      <div id="checkbox1" className="usa-checkbox margin-x-1">
        <input
          className="usa-checkbox__input"
          id="checkbox1__usa-checkbox__input"
          type="checkbox"
          name="checkbox1"
          value="9/11 commisssion"
          checked={checkbox.checkbox1}
          onChange={handleCheckboxChange}
        />
        <label
          className="usa-checkbox__label"
          htmlFor="checkbox1__usa-checkbox__input"
        >
          9/11 Commission
        </label>
      </div>
      <div id="checkbox1" className="usa-checkbox">
        <input
          className="usa-checkbox__input"
          id="checkbox2__usa-checkbox__input"
          type="checkbox"
          name="checkbox2"
          value="gdelt"
          checked={checkbox.checkbox2}
          onChange={handleCheckboxChange}
        />
        <label
          className="usa-checkbox__label"
          htmlFor="checkbox2__usa-checkbox__input"
        >
          GDELT
        </label>
      </div>
    </div>
  );
}
