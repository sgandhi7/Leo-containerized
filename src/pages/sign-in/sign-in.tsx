import { Alert } from '@metrostar/comet-uswds';
import React, { useEffect } from 'react';
import useAuth from '../../hooks/use-auth';

export const SignIn = (): React.ReactElement => {
  const { error, signIn } = useAuth();

  useEffect(() => {
    signIn();
  }, [signIn]);

  return (
    <div className="signin">
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col padding-top-1">
            <span className="text-white">Sign in required...</span>
            {error && (
              <Alert id="loginAlert" type="error" heading="Error">
                Login unsuccessful. Please try again.
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
