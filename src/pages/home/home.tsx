import { Search } from '@src/components/search/search';
import useSuggestionsApi from '@src/hooks/use-suggestions-api';
import { Investigation as InvestigationState } from '@src/types/investigation';
import { Suggestion } from '@src/types/suggestion';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from '../../store';
import logomark from '/img/logo-mark.svg';

export const Home = (): React.ReactElement => {
  const { getItems, items } = useSuggestionsApi();
  const [, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);
  const [searchInput, setSearchInput] = useState<string>('');

  const handleButtonClick = (buttonText: string) => {
    setSearchInput(buttonText);
  };

  useEffect(() => {
    setCurrentInvestigation({});
  }, [setCurrentInvestigation]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <>
      <div className="grid-container">
        <div className="grid-row display-flex height-viewport">
          <div
            className="flex-align-self-start width-100 padding-top-15 margin-x-auto margin-y-auto"
            style={{ textAlign: 'center' }}
          >
            <img
              className="usa__logo"
              src={logomark}
              alt="Horizon Hunt Logo"
              width={56}
            />
            <h1 className="margin-bottom-2">
              What would you like to Investigate?
            </h1>
            <p className="margin-bottom-3">
              Try a sample prompt, or start your own search below.
            </p>
            <div className="button-container">
              {items ? (
                items.map((suggestion: Suggestion) => (
                  <button
                    key={suggestion.id}
                    className="helper-button"
                    onClick={() => handleButtonClick(suggestion.value)}
                  >
                    {suggestion.value}
                  </button>
                ))
              ) : (
                <></>
              )}
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
