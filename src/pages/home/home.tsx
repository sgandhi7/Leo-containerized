import { Button, TextInput } from '@metrostar/comet-uswds';
import React, { SyntheticEvent, useState } from 'react';

export const Home = (): React.ReactElement => {
  const [query, setQuery] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleOnChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setQuery(value);
  };

  const handleSearch = () => {
    setPrompt(query);
  };

  return (
    <div className="grid-container padding-top-1">
      <div className="grid-row padding-bottom-3">
        <div className="grid-col-12 display-flex flex-justify-center">
          <TextInput
            id="search-input"
            name="search-input"
            className="width-full padding-top-3 padding-bottom-3 margin-right-3"
            placeholder="What would you like to investigate?"
            autoFocus
            onChange={handleOnChange}
          />
          <Button
            id="search-btn"
            onClick={handleSearch}
            style={{ marginTop: '7px' }}
          >
            Search
          </Button>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col">{prompt}</div>
      </div>
    </div>
  );
};
