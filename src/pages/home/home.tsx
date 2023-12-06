import { Search } from '@src/components/search/search';
import { Investigation as InvestigationState } from '@src/types/investigation';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from '../../store';

export const Home = (): React.ReactElement => {
  const [, setCurrentInvestigation] =
    useRecoilState<InvestigationState>(defaultInvestigation);

  useEffect(() => {
    setCurrentInvestigation({});
  }, [setCurrentInvestigation]);

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
            </div>
          </div>
        </div>
      </div>
      <Search />
    </>
  );
};
