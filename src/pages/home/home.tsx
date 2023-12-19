import { Search } from '@src/components/search/search';
import { Investigation as InvestigationState } from '@src/types/investigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from '../../store';

export const Home = (): React.ReactElement => {
  const [, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);
  const [buttonSearchQuery, setButtonSearchQuery] = useState('');

  useEffect(() => {
    setCurrentInvestigation({});
    console.log('setCurrentInvestigation', setCurrentInvestigation);
  }, [setCurrentInvestigation]);

  const handleButtonClick = (text: string) => {
    console.log('//////handleButtonClicked', text);
    setButtonSearchQuery(text);
  };

  return (
    <>
      <div className="grid-container padding-top-1">
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
              <button
                className="button-suggest"
                onClick={() =>
                  handleButtonClick(
                    'What lead up to the 9/11 attacks and what was known?',
                  )
                }
              >
                Try seaching: What lead up to the 9/11 attacks and what was
                known?
              </button>
              <button
                className="button-suggest"
                onClick={() =>
                  handleButtonClick('Who was involved in the 9/11 commission?')
                }
              >
                Text 2
              </button>
              <button
                className="button-suggest"
                onClick={() => handleButtonClick('Text 3')}
              >
                Text 3
              </button>
            </div>
          </div>
        </div>
      </div>
      <Search buttonSearchQuery={buttonSearchQuery} />
    </>
  );
};
