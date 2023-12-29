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
        <div className="grid-row">
          <div className="grid-col">
            <div
              className="width-100 padding-top-6"
              style={{ textAlign: 'center' }}
            >
              <h1 className="margin-bottom-4">
                What would you like to Investigate?
              </h1>
              <p className="margin-top-1">
                Perform a search on one dataset or multiple datasets.
              </p>
              <div className="button-container">
                <p className="helper-text">
                  Don't know where to start? Try a helper prompt.
                </p>

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
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
    </>
  );
};
