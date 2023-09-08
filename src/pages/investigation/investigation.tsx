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
  const [queryCounter, setQueryCounter] = useState(0);
  const [currentInvestigation, setCurrentInvestigation] =
    useState<CurrentInvestigation>();

  const updateFocus = () => {
    const input = document.querySelector('input');
    if (input) {
      input.focus();
    }
  };

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

    const completions = [
      'John Doe is a very common name, can you narrow it down further?',
      'Fortunately, there is only 1 John Doe from New York. He lives on Fifth Avenue, right next to the park.',
      'The address is 12345 Fifth Avenue, New York, NY 20000.',
      'I do not have any more information than that.',
      'I do not have any more information than that.',
    ];

    setTimeout(() => {
      newPrompt = {
        ...newPrompt,
        completion: completions[queryCounter],
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

  useEffect(() => {
    if (item) {
      setCurrentInvestigation(item);
    }
  }, [item]);

  useEffect(() => {
    if (id) {
      getItem(id);
    } else {
      setCurrentInvestigation(undefined);
      setQueryCounter(0);
      updateFocus();
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
