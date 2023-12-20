import { Search } from '@src/components/search/search';
import { Investigation as InvestigationState } from '@src/types/investigation';
import { SUGGESTIONS } from '@src/utils/constants';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from '../../store';
export const Home = (): React.ReactElement => {
  const [, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    setCurrentInvestigation({});
  }, [setCurrentInvestigation]);

  const handleButtonClick = (buttonText: string) => {
    setSearchInput(buttonText);
  };

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

                {SUGGESTIONS.map((suggestion: string, index: number) => (
                  <button
                    key={index}
                    className="helper-button"
                    onClick={() => handleButtonClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
    </>
  );
};
