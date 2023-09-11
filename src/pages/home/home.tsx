import { Search } from '@src/components/search/search';
import { Investigation as InvestigationState } from '@src/types/investigation';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentInvestigation as defaultInvestigation } from 'src/store';

export const Home = (): React.ReactElement => {
  const [, setCurrentInvestigation] = useRecoilState<
    InvestigationState | undefined
  >(defaultInvestigation);

  useEffect(() => {
    setCurrentInvestigation(undefined);
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
              <h1>What would you like to Investigate?</h1>
            </div>
          </div>
        </div>
      </div>
      <Search />
    </>
  );
};
