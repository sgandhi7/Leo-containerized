import { Search } from '@src/components/search/search';
import { Investigation as InvestigationState } from '@src/types/investigation';
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
                <button
                  className="helper-button"
                  onClick={() =>
                    handleButtonClick(
                      'What intel lapses occurred, and how can they be prevented?',
                    )
                  }
                >
                  What intel lapses occurred, and how can they be prevented?
                </button>
                <button
                  className="helper-button"
                  onClick={() =>
                    handleButtonClick(
                      'Assess emergency response; suggest improvements for future catastrophic events',
                    )
                  }
                >
                  Assess emergency response; suggest improvements for future
                  catastrophic events
                </button>
                <button
                  className="helper-button"
                  onClick={() =>
                    handleButtonClick(
                      'Examine global collaboration post-9/11; propose measures for enhanced cooperation.',
                    )
                  }
                >
                  Examine global collaboration post-9/11; propose measures for
                  enhanced cooperation.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
    </>
  );
};
