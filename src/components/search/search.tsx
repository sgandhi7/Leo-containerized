import { Button } from '@metrostar/comet-uswds';
import DatasetCheck from '@src/components/search/dataset-check';
import SuggestData from '@src/components/search/suggest-data';
import useApi from '@src/hooks/use-api';
import {
  Investigation as InvestigationState,
  Prompt,
} from '@src/types/investigation';
import { generateGUID, getChatHistory } from '@src/utils/api';
import React, { SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  currentDataset as defaultDataset,
  currentInvestigation as defaultInvestigation,
  searching,
} from '../../store';
import { TextAreaInput } from '../text-area-input/textarea-input.tsx';
import infinteLoop from '/img/infinteLoop.svg';
export const Search = ({
  searchInput,
  setSearchInput,
}: {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}): React.ReactElement => {
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

    const queryCopy = searchInput;
    let newData: Prompt[] = [];
    if (currentInvestigation?.prompts) {
      newData = [...currentInvestigation.prompts];
    }

    let newPrompt: Prompt = {
      id: Math.random().toString(),
      prompt: queryCopy,
      completion: 'Loading...',
    };
    newData.unshift(newPrompt);

    // Get current chat history
    const chatHistory = getChatHistory(newData);
    await search(queryCopy, currentDataset, chatHistory).then((response) => {
      if (response?.length > 0) {
        const completion = response[0];
        newPrompt = {
          id: generateGUID(),
          prompt: queryCopy,
          completion: completion.completion.trim(),
          sources: completion.sources,
        };

        newData[0] = newPrompt;
        updateCurrentInvestigation(newData);
        setIsSearching(false);
      }
      setSearchInput('');
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
    setSearchInput(value);
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
        <TextAreaInput
          id="search-input"
          name="search-input"
          label="Enter your search here..."
          className="search-area-input"
          autoFocus
          placeholder="Enter your search here..."
          value={searchInput}
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
            className="search-input"
            onClick={handleSearch}
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
