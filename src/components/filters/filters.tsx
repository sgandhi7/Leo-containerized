import { Button } from '@metrostar/comet-uswds';
import useAuth from '@src/hooks/use-auth';
import React from 'react';
import { useRecoilState } from 'recoil';
import { filtering } from '../../../src/store';
import Datasets from '../datasets/datasets';
import MediaTypes from '../media-types/media-types';

export const Filters = (): React.ReactElement => {
  const { isSignedIn } = useAuth();
  const [isFiltering, setIsFiltering] = useRecoilState<boolean>(filtering);

  const toggleFilters = () => {
    setIsFiltering(!isFiltering);
  };

  return (
    <div id="filters" className="display-flex flex-row">
      {isSignedIn ? (
        <div
          className={`filters ${isFiltering ? 'open padding-x-2 padding-y-3' : ''}`}
        >
          <div className={`width-full display-flex flex-column`}>
            <div>
              {isFiltering ? (
                <div className="display-flex flex-column">
                  <div>
                    <span className="text-bold">Filters</span>
                    <div className="padding-top-4">Datasets</div>
                    <hr className="width-full" />
                    <Datasets />
                    <div className="padding-top-4">Media Types</div>
                    <hr className="width-full" />
                    <MediaTypes />
                  </div>
                  <div className="filters-btn-container">
                    <Button
                      id="filters-btn"
                      variant="unstyled"
                      className="open"
                      onClick={toggleFilters}
                    >
                      Hide Filters
                    </Button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Filters;
