import { Button } from '@metrostar/comet-uswds';
import DatasetCheck from '@src/components/search/dataset-check';
import SuggestData from '@src/components/search/suggest-data';
import useApi from '@src/hooks/use-api';
import {
  Investigation as InvestigationState,
  Prompt,
} from '@src/types/investigation';
import { generateGUID, getChatHistory } from '@src/utils/api';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
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
  buttonSearchQuery,
}: {
  buttonSearchQuery: string;
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

  const updateFocus = useCallback(() => {
    const input = document.querySelector('input');
    if (input) {
      input.focus();
    }
  }, []);

  const generateUniqueId = () => {
    // Get the current timestamp
    const timestamp = new Date().getTime();

    // Generate a random number (between 0 and 9999) to add uniqueness
    const randomNum = Math.floor(Math.random() * 10000);

    // Concatenate the timestamp and random number to create the unique ID
    const uniqueId = `${timestamp}${randomNum}`;

    return uniqueId;
  };

  const submitSearch = useCallback(async () => {
    setIsSearching(true);
    if (location.pathname === '/') {
      navigate('/investigations');
    }

    const updateCurrentInvestigation = (newData: Prompt[]) => {
      if (buttonSearchQuery) {
        console.log('/// 2  setQuery buttonSearchQuery', buttonSearchQuery);
        // Create a new Prompt object for buttonSearchQuery
        const searchQueryPrompt: Prompt = {
          id: generateUniqueId(), // You need to implement a function to generate unique IDs
          prompt: buttonSearchQuery,
          completion: 'Loading...',
          // Add other properties as needed
        };
        // Update currentInvestigation with the new data, including the searchQueryPrompt
        setCurrentInvestigation((prev) => ({
          ...prev,
          prompts: [...newData, searchQueryPrompt],
        }));
      } else {
        console.log('updateCurrentInvestigation', currentInvestigation);
        console.log('newData', newData);
        setCurrentInvestigation((prev) => ({
          ...prev,
          prompts: [...newData],
        }));
      }
    };

    console.log('query before queryCopy', query);
    const queryCopy = query;
    console.log('queryCopy', query);
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
    });

    setQuery('');
    updateFocus();
  }, [
    location.pathname,
    navigate,
    query,
    currentInvestigation,
    currentDataset,
    search,
    setCurrentInvestigation,
    setIsSearching,
    setQuery,
    updateFocus,
    buttonSearchQuery,
    // updateCurrentInvestigation,
  ]);

  useEffect(() => {
    if (buttonSearchQuery) {
      console.log('buttonSearchQuery', buttonSearchQuery);
      setQuery(buttonSearchQuery);
      submitSearch();
    }
  }, [buttonSearchQuery, submitSearch]);

  const handleOnChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    console.log('value', value);
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
        <TextAreaInput
          id="search-input"
          name="search-input"
          label="Enter your search here..."
          className="search-area-input"
          autoFocus
          placeholder="Enter your search here..."
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
