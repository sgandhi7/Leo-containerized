import { Button, TextInput } from '@metrostar/comet-uswds';
import DatasetCheck from '@src/components/search/dataset-check';
import SuggestData from '@src/components/search/suggest-data';
import useApi from '@src/hooks/use-api';
import {
  Investigation as InvestigationState,
  Prompt,
} from '@src/types/investigation';
import { generateGUID } from '@src/utils/api';
import React, { SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  currentDataset as defaultDataset,
  currentInvestigation as defaultInvestigation,
  searching,
} from '../../store';
import infinteLoop from '/img/infinteLoop.svg';

export const Search = (): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search, loading } = useApi();
  const [query, setQuery] = useState('');
  const [currentInvestigation, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);
  const [isSearching, setIsSearching] = useRecoilState<boolean>(searching);
  const [currentDataset] = useRecoilState<string>(defaultDataset);
  const home = location.pathname === '/';
  const updateFocus = () => {
    const input = document.querySelector('input');
    if (input) {
      input.focus();
    }
  };

  const submitSearch = async () => {
    setIsSearching(true);
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
    await search(queryCopy, currentDataset).then((response) => {
      if (response?.length > 0) {
        const completion = response[0];
        newPrompt = {
          id: generateGUID(),
          prompt: queryCopy,
          completion: completion.completion,
          score: 0,
        };

        newData[0] = newPrompt;
        updateCurrentInvestigation(newData);
        setIsSearching(false);
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
    <div className="grid-container position-relative bottom-2">
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
            if (event.key === 'Enter' && query.trim() !== '') {
              submitSearch();
            }
          }}
        />

        {loading || isSearching ? (
          <img src={infinteLoop} alt="loading" className="searching" />
        ) : (
          <Button
            id="search-btn"
            onClick={handleSearch}
            style={{ marginTop: '7px' }}
            disabled={loading || isSearching}
          >
            Search
          </Button>
        )}
      </div>
      {home ? <DatasetCheck /> : null}
      {home ? <SuggestData /> : null}
    </div>
  );
};
