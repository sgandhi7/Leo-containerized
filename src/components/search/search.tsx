import { Button, TextInput } from '@metrostar/comet-uswds';
import DatasetCheck from '@src/components/search/DatasetCheck';
import SuggestData from '@src/components/search/SuggestData';
import useApi from '@src/hooks/use-api';
import {
  Investigation as InvestigationState,
  Prompt,
} from '@src/types/investigation';
import React, { SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from '../../store';

export const Search = (): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = useApi();
  const [query, setQuery] = useState('');
  const [currentInvestigation, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);
  const home = location.pathname === '/';
  const updateFocus = () => {
    const input = document.querySelector('input');
    if (input) {
      input.focus();
    }
  };

  const submitSearch = async () => {
    if (location.pathname === '/') {
      navigate('/investigations');
    }

    const queryCopy = query;
    let newData: Prompt[] = [];
    if (currentInvestigation?.prompts) {
      newData = [...currentInvestigation.prompts];
    }

    let newPrompt: Prompt = {
      id: Math.random().toString(),
      prompt: queryCopy,
      completion: 'Loading...',
      score: 0,
    };

    newData.unshift(newPrompt);
    await search(queryCopy).then((response) => {
      if (response?.length > 0) {
        const completion = response[0];
        newPrompt = {
          id: completion.id,
          prompt: queryCopy,
          completion: completion.text,
          score: completion.score,
        };

        newData[0] = newPrompt;
        updateCurrentInvestigation(newData);
      }
    });

    setQuery('');
    updateFocus();
  };

  const updateCurrentInvestigation = (newData: Prompt[]) => {
    setCurrentInvestigation((prev) => ({
      ...prev,
      prompts: [...newData],
    }));
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
    <div className="grid-container position-relative bottom-1">
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
      <DatasetCheck />
      {home ? <SuggestData /> : null}
    </div>
  );
};
