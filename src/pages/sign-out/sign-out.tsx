import { Button } from '@metrostar/comet-uswds';
import React from 'react';
import useAuth from '../../hooks/use-auth';

export const SignOut = (): React.ReactElement => {
  const { signOut } = useAuth();

  const handleSignOut = (): void => {
    signOut();
  };

  return (
    <div className="signin">
      <div className="grid-container">
        <div className="grid-row">
          <div className="tablet:grid-col-5 padding-top-4">
            <Button id="signout" onClick={handleSignOut}>
              Click to Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
