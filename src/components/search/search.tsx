import { Button, TextInput } from '@metrostar/comet-uswds';
import { completionData } from '@src/data/investigation';
import {
  Investigation as InvestigationState,
  Prompt,
} from '@src/types/investigation';
import React, { SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from 'src/store';

export const Search = (): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [queryCounter, setQueryCounter] = useState(
    location.pathname === '/' ? 0 : 1,
  );
  const [currentInvestigation, setCurrentInvestigation] = useRecoilState<
    InvestigationState | undefined
  >(defaultInvestigation);

  const updateFocus = () => {
    const input = document.querySelector('input');
    if (input) {
      input.focus();
    }
  };

  const submitSearch = () => {
    if (location.pathname === '/') {
      navigate('/investigations');
    }

    const queryCopy = query;
    setQuery('');

    let newData: Prompt[] = [];
    const currentPrompts = currentInvestigation?.prompts;
    if (currentPrompts) {
      newData = [...currentInvestigation.prompts];
    }
    let newPrompt: Prompt = {
      id: Math.random().toString(),
      prompt: queryCopy,
      completion: 'Loading...',
      score: 0.99,
    };
    newData.unshift(newPrompt);
    setCurrentInvestigation((prev) => ({
      ...prev,
      prompts: [...newData],
    }));

    setTimeout(() => {
      newPrompt = {
        ...newPrompt,
        completion: completionData[queryCounter],
      };

      newData[0] = newPrompt;
      setCurrentInvestigation((prev) => ({
        ...prev,
        prompts: [...newData],
      }));

      setQueryCounter((prev) => prev + 1);
      updateFocus();
    }, 2000);
  };

  const handleOnChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setQuery(value);
  };

  const handleSearch = () => {
    submitSearch();
  };

  return (
    <div className="grid-container">
      <div
        className={`display-flex flex-justify-center search-area ${
          location.pathname === '/'
            ? 'search-area-home'
            : 'search-area-investigation'
        }`}
      >
        <TextInput
          id="search-input"
          name="search-input"
          className="width-full padding-top-3 padding-bottom-3 margin-right-3"
          placeholder="Enter your search here..."
          autoFocus
          value={query}
          onChange={handleOnChange}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              submitSearch();
            }
          }}
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
  );
};
