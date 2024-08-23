import { Alert, Button } from '@metrostar/comet-uswds';
import React from 'react';
import useAuth from '../../hooks/use-auth';

export const SignIn = (): React.ReactElement => {
  const { error, signIn } = useAuth();

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
            <div className="padding-top-2">
              <Button id="sign-in" type="button" onClick={signIn}>
                Click to Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
