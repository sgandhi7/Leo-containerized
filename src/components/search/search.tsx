import { Button, TextArea } from '@metrostar/comet-uswds';
import useApi from '@src/hooks/use-api';
import { Chat as ChatState, Prompt } from '@src/types/chat';
import { generateGUID, getChatHistory } from '@src/utils/api';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  currentChat as defaultChat,
  currentSearch as defaultSearch,
  searching,
} from '../../store';
import infinteLoop from '/img/infinteLoop.svg';

export const Search = ({
  searchInput,
  setSearchInput,
}: {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}): React.ReactElement => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { search, loading } = useApi();
  const [, setQuery] = useState('');
  const [currentChat, setCurrentChat] = useRecoilState<ChatState>(defaultChat);
  const [isSearching, setIsSearching] = useRecoilState<boolean>(searching);
  const [, setCurrentSearch] = useRecoilState<string>(defaultSearch);

  const updateFocus = () => {
    const input = document.querySelector('textarea');
    if (input) {
      input.focus();
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);
    setCurrentSearch(searchInput);
    // if (location.pathname === '/') {
    //   navigate('/chat');
    // }

    const queryCopy = searchInput;
    let newData: Prompt[] = [];
    if (currentChat?.prompts) {
      newData = [...currentChat.prompts];
    }

    let newPrompt: Prompt = {
      id: Math.random().toString(),
      prompt: queryCopy,
      completion: 'Loading...',
    };
    newData.unshift(newPrompt);

    // Get current chat history
    const chatHistory = getChatHistory(newData);
    await search(queryCopy, chatHistory).then((response) => {
      if (response) {
        const completion = response;
        newPrompt = {
          id: generateGUID(),
          prompt: queryCopy,
          completion: completion.answer ? completion.answer.trim() : '',
          sources: undefined,
        };

        newData[0] = newPrompt;
        updateCurrentChat(newData);
        setIsSearching(false);
      }
      setSearchInput('');
    });
    setQuery('');
  };

  const updateCurrentChat = (newData: Prompt[]) => {
    setCurrentChat((prev) => ({
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

  const handleClear = () => {
    updateCurrentChat([]);
    setSearchInput('');
    updateFocus();
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
        <Button
          id="clear-btn"
          onClick={handleClear}
          disabled={!currentChat?.prompts || currentChat?.prompts.length === 0}
        >
          Clear
        </Button>
        <div className="text-container">
          <TextArea
            id="search-input"
            name="search-input"
            aria-label="Search Horizon Hunt"
            className="search-area-input"
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
              // TODO: Remove this and fix button resizing
              else if (event.key === 'Enter' && event.shiftKey) {
                event.preventDefault();
              }
            }}
            placeholder="Message Navigator..."
            rows={1}
            cols={1}
            disabled={loading || isSearching}
            autoFocus
            style={{
              minHeight: `3rem`,
              maxHeight: `${1 * 20}rem`,
              borderRadius: '10px',
              margin: '1rem',
              marginRight: 0,
              padding: '12px',
            }}
          />
        </div>
        <Button
          id="search-btn"
          className={`search-input ${loading || isSearching ? 'disabled' : ''}`}
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
