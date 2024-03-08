import { Button, Icon } from '@metrostar/comet-uswds';
import useAuth from '@src/hooks/use-auth';
import React from 'react';
import { useRecoilState } from 'recoil';
import {
  currentDataset as defaultDataset,
  currentMediaTypes as defaultMediaTypes,
  filtering,
} from '../../../src/store';
import Datasets from '../datasets/datasets';
import MediaTypes from '../media-types/media-types';

export const Filters = (): React.ReactElement => {
  const { isSignedIn } = useAuth();
  const [isFiltering, setIsFiltering] = useRecoilState<boolean>(filtering);
  const [currentDataset, setCurrentDataset] =
    useRecoilState<string>(defaultDataset);
  const [currentMediaTypes, setCurrentMediaTypes] =
    useRecoilState<string>(defaultMediaTypes);

  const toggleFilters = () => {
    setIsFiltering((isFiltering) => !isFiltering);
  };

  const clearFilters = () => {
    console.log(
      'clear beginning ' + currentDataset + ' and media ' + currentMediaTypes,
    );

    if (currentDataset || currentMediaTypes) {
      setCurrentMediaTypes('');
      setCurrentMediaTypes('');
    }

    const filterWrapper = document.getElementById('filters');
    if (filterWrapper) {
      const filterInputs = Array.from(
        filterWrapper.getElementsByTagName(
          'input',
        ) as HTMLCollectionOf<HTMLInputElement>,
      );
      filterInputs.forEach((element) => (element.checked = false));
    }

    console.log(
      'clear after ' + currentDataset + ' and media ' + currentMediaTypes,
    );
  };

  const applyFilters = () => {
    console.log(
      'apply before ' + currentDataset + ' and media ' + currentMediaTypes,
    );
    setCurrentDataset(currentDataset);
    setCurrentMediaTypes(currentMediaTypes);
    console.log(
      'apply after ' + currentDataset + ' and media ' + currentMediaTypes,
    );
  };

  return (
    <div id="filters" className="display-flex flex-row">
      {isSignedIn ? (
        <div
          className={`filters ${isFiltering ? 'open padding-x-2 padding-y-3' : ''}`}
        >
          <div className={`width-full display-flex flex-column height-full`}>
            <div className="height-full">
              {isFiltering ? (
                <div className="display-flex flex-column height-full flex-justify">
                  <div>
                    <div className="display-flex flex-align-center flex-justify">
                      <span className="text-bold display-flex">
                        <Icon
                          id="filters-icon"
                          type="filter_alt"
                          className="margin-right-1"
                          size="size-3"
                        />
                        Filters
                      </span>
                      <Button
                        id="close-btn"
                        variant="unstyled"
                        className="open"
                        aria-label="close filters"
                        onClick={toggleFilters}
                      >
                        <Icon
                          id="close-icon"
                          type="close"
                          className=""
                          size="size-3"
                        />
                      </Button>
                    </div>
                    <div className="padding-top-4 margin-bottom-2">
                      DATASETS
                    </div>
                    <Datasets />
                    <div className="padding-top-4 margin-bottom-2">
                      MEDIA TYPES
                    </div>
                    <MediaTypes />
                  </div>
                  <div className="filters-btn-container display-flex flex-justify margin-top-4">
                    <Button
                      id="clear-filters-btn"
                      className="usa-button radius-pill text-normal"
                      onClick={clearFilters}
                    >
                      Clear
                    </Button>
                    <Button
                      id="apply-filters-btn"
                      className="usa-button radius-pill text-normal"
                      onClick={applyFilters}
                    >
                      Apply
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
