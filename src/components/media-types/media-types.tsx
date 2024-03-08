import { mediaTypesData } from '@src/data/media-type';
import { MediaType } from '@src/types/media-type';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentMediaTypes as defaultMediaTypes } from '../../store';

export default function MediaTypes() {
  const [items, setItems] = useState<MediaType[]>([]);
  const [currentMediaTypes, setCurrentMediaTypes] =
    useRecoilState<string[]>(defaultMediaTypes);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const newValues = [...currentMediaTypes];
    if (checked) {
      newValues.push(value);
    } else {
      const index = newValues.indexOf(value);
      if (index > -1) {
        newValues.splice(index, 1);
      }
    }
    setCurrentMediaTypes(newValues);
  };

  useEffect(() => {
    setItems(mediaTypesData);
  }, []);

  useEffect(() => {
    if (items && items.length > 0) {
      setCurrentMediaTypes([items[0].value]);
    }
  }, [items, setCurrentMediaTypes]);

  return (
    <div
      id="story--uswds-forms-checkbox--standard--primary-inner"
      data-name="Standard"
      className="display-flex flex-column datasets"
    >
      {items ? (
        items.map((mediaType: MediaType) => (
          <div
            key={`media_type_checkbox${mediaType.id}`}
            className="usa-checkbox margin-x-1 margin-bottom-1"
          >
            <input
              className="usa-checkbox__input"
              id={`media_type_checkbox${mediaType.id}__usa-checkbox__input`}
              type="checkbox"
              name={`media_type_checkbox${mediaType.id}`}
              disabled={mediaType.disable}
              value={`${mediaType.value}`}
              checked={currentMediaTypes.includes(mediaType.value)}
              onChange={handleCheckboxChange}
            />
            <label
              className="usa-checkbox__label"
              htmlFor={`media_type_checkbox${mediaType.id}__usa-checkbox__input`}
            >
              {mediaType.display_name}
            </label>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
