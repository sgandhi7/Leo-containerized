import { Button, TextInput } from '@metrostar/comet-uswds';
import useApi from '@src/hooks/use-api';
import {
  Investigation as CurrentInvestigation,
  Prompt,
} from '@src/types/investigation';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Investigation = (): React.ReactElement => {
  const { id } = useParams();
  const { getItem, item } = useApi();
  const [query, setQuery] = useState('');
  const [currentInvestigation, setCurrentInvestigation] =
    useState<CurrentInvestigation>();

  const submitSearch = () => {
    const queryCopy = query;
    setQuery('');

    let newData: Prompt[] = [];
    const currentPrompts = currentInvestigation?.prompts;
    if (currentPrompts) {
      newData = [...currentInvestigation.prompts];
    }
    let newPrompt: Prompt = {
      id: '1111',
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
        completion:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      };

      newData[0] = newPrompt;
      setCurrentInvestigation((prev) => ({
        ...prev,
        prompts: [...newData],
      }));

      const input = document.querySelector('input');
      if (input) {
        input.focus();
      }
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

  useEffect(() => {
    if (item) {
      setCurrentInvestigation(item);
    }
  }, [item]);

  useEffect(() => {
    if (id) {
      getItem(id);
    }
  }, [id, getItem]);

  return (
    <>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col">
            <div className="chat-content">
              {currentInvestigation?.prompts.map((prompt: Prompt) => (
                <div key={`chat-content-${prompt.id}`}>
                  <div
                    key={`chat-content-answer-${prompt.id}`}
                    className={`chat-content-answer ${
                      prompt.completion === 'Loading...' ? 'text-bold' : ''
                    }`}
                  >
                    {prompt.completion}
                  </div>
                  <div
                    key={`chat-content-question-${prompt.id}`}
                    className="chat-content-question"
                  >
                    {prompt.prompt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid-container">
        <div className="display-flex flex-justify-center search-area">
          <TextInput
            id="search-input"
            name="search-input"
            className="width-full padding-top-3 padding-bottom-3 margin-right-3"
            placeholder="What would you like to investigate?"
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
    </>
  );
};
