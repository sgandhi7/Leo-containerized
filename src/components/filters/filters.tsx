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
        <div className={`filters ${isOpen ? 'open' : ''}`}>
          <div
            className={`width-full display-flex flex-column ${isOpen ? 'flex-align-start' : 'flex-align-end'}`}
          >
            <div>
              {isOpen ? (
                <span className="filters-text text-black text-bold">
                  Filters
                </span>
              ) : (
                <></>
              )}
              <Button
                id="filters-btn"
                variant="unstyled"
                onClick={toggleFilters}
              >
                <Icon
                  id="expand-collapse-icon"
                  type={isOpen ? 'navigate_far_before' : 'navigate_far_next'}
                  className="text-black"
                  size="size-4"
                />
              </Button>
              {isOpen ? (
                <div>
                  <div className="padding-top-2">Datasets</div>
                  <hr className="width-full" />
                  <Datasets />
                  <div className="padding-top-4">Media Types</div>
                  <hr className="width-full" />
                  <MediaTypes />
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
