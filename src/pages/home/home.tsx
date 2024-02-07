import { Search } from '@src/components/search/search';
import useSuggestionsApi from '@src/hooks/use-suggestions-api';
import { Investigation as InvestigationState } from '@src/types/investigation';
import { Suggestion } from '@src/types/suggestion';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from '../../store';
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
        <div className="grid-row padding-top-10">
          <div className="grid-col">
            <div
              className="width-100 padding-top-1 flex flex-row"
              style={{ textAlign: 'center' }}
            >
              <h1 className="margin-bottom-2">
                What would you like to Investigate?
              </h1>
              <p className="margin-bottom-3">
                Try a sample prompt, or start your own search below.
              </p>
              <div className="button-container flex flex-align">
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
          </div>
        </div>
      </div>
      <div id="investigations" className="prompt">
        <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      </div>
    </>
  );
};
