import { Search } from '@src/components/search/search';
import { Chat as ChatState } from '@src/types/chat';
import { SUGGESTIONS } from '@src/utils/constants';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentChatState, currentSearchState } from '../../store';

export const Home = (): React.ReactElement => {
  const [, setCurrentChat] = useRecoilState<ChatState>(currentChatState);
  const [searchInput, setSearchInput] = useState<string>('');
  const [, setCurrentSearch] = useRecoilState<string>(currentSearchState);

  const handleButtonClick = (buttonText: string) => {
    setSearchInput(buttonText);
  };

  useEffect(() => {
    setCurrentChat({});
  }, [setCurrentChat]);

  // Clear current search when navigating to home
  useEffect(() => {
    setCurrentSearch('');
  }, [setCurrentSearch]);

  return (
    <>
      <div className="grid-container">
        <div className="grid-row display-flex height-viewport">
          <div
            className="flex-align-self-start width-100 padding-top-15 margin-x-auto margin-y-auto"
            style={{ textAlign: 'center' }}
          >
            <h1 className="margin-bottom-2">What would you like to Search?</h1>
            <p className="margin-bottom-3">
              Try a sample prompt, or start your own search below.
            </p>
            <div className="button-container">
              {SUGGESTIONS.map((suggestion: string, index: number) => (
                <button
                  key={`suggestion-${index}`}
                  className="helper-button"
                  onClick={() => handleButtonClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-align-self-end width-full margin-bottom-5">
            <Search searchInput={searchInput} setSearchInput={setSearchInput} />
          </div>
        </div>
      </div>
    </>
  );
};
