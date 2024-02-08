import { Button } from '@metrostar/comet-uswds';
import useApi from '@src/hooks/use-api';
import {
  Investigation as InvestigationState,
  Prompt,
} from '@src/types/investigation';
import { generateGUID, getChatHistory } from '@src/utils/api';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  currentDataset as defaultDataset,
  currentInvestigation as defaultInvestigation,
  initialSearch as defaultSearch,
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
  const [, setQuery] = useState('');
  const [currentInvestigation, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);
  const [isSearching, setIsSearching] = useRecoilState<boolean>(searching);
  const [currentDataset] = useRecoilState<string>(defaultDataset);
  const [, setInitialSearch] = useRecoilState<string>(defaultSearch);

  const updateFocus = () => {
    const input = document.querySelector('textarea');
    if (input) {
      input.focus();
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);
    if (location.pathname === '/') {
      setInitialSearch(searchInput);
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

  useEffect(() => {
    if (!isSearching && !loading) {
      setSearchInput('');
      updateFocus();
    }
  }, [isSearching, loading, setSearchInput]);

  return (
    <div className="grid-container position-relative bottom-2">
      <div
        className={`display-flex flex-justify-center search-area margin-x-auto margin-y-auto ${
          location.pathname === '/'
            ? 'search-area-home'
            : 'search-area-investigation'
        }`}
      >
        <TextAreaInput
          id="search-input"
          name="search-input"
          label="Message Horizon Hunt..."
          className="search-area-input"
          autoFocus
          placeholder="Message Horizon Hunt..."
          disabled={loading || isSearching}
          value={searchInput}
          onChange={handleOnChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
            }
          }}
          onKeyUp={(event) => {
            if (
              event.key === 'Enter' &&
              !event.shiftKey &&
              searchInput.trim() !== ''
            ) {
              handleSearch();
            }
          }}
        />
        <Button
          id="search-btn"
          className="search-input"
          onClick={handleSearch}
          disabled={loading || isSearching || searchInput.trim() === ''}
        >
          {loading || isSearching ? (
            <img src={infinteLoop} alt="loading" className="searching" />
          ) : (
            <>Search</>
          )}
        </Button>
      </div>
    </div>
  );
};
