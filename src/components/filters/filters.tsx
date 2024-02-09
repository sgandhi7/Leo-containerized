import { Button, Icon } from '@metrostar/comet-uswds';
import useAuth from '@src/hooks/use-auth';
import React, { useState } from 'react';
import Datasets from '../datasets/datasets';
import MediaTypes from '../media-types/media-types';

export const Filters = (): React.ReactElement => {
  const { isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="filters">
      {isSignedIn ? (
        <div
          className={`filters ${isOpen ? 'open padding-x-2 padding-y-3' : ''}`}
        >
          <div className={`width-full display-flex flex-column`}>
            <div>
              {isOpen ? (
                <>
                  <Button
                    id="toggle-btn"
                    variant="unstyled"
                    onClick={toggleFilters}
                  >
                    <Icon
                      id="expand-collapse-icon"
                      type="navigate_far_before"
                      className="text-black"
                      size="size-4"
                    />
                    <span className="filters-text text-black font-bold">
                      Collapse
                    </span>
                  </Button>
                  <div>
                    <div className="padding-top-2">Datasets</div>
                    <hr className="width-full" />
                    <Datasets />
                    <div className="padding-top-4">Media Types</div>
                    <hr className="width-full" />
                    <MediaTypes />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          {isOpen ? (
            <></>
          ) : (
            <Button
              id="filters-btn"
              className={`${isOpen ? 'open' : ''}`}
              variant="unstyled"
              onClick={toggleFilters}
            >
              <span className="text-black text-bold">Filters</span>
              <Icon
                id="expand-collapse-icon"
                type="navigate_far_next"
                className="text-black"
                size="size-4"
              />
            </Button>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Filters;
