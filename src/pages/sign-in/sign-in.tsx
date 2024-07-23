import { Alert, Button } from '@metrostar/comet-uswds';
import { hasSsoConfig } from '@src/utils/auth';
import React from 'react';
import useAuth from '../../hooks/use-auth';

export const SignIn = (): React.ReactElement => {
  const { signIn, error } = useAuth();

  const handleSsoSignIn = (): void => {
    signIn(true);
  };

  return (
    <div className="signin">
      <div className="grid-container">
        <div className="grid-row">
          <div className="tablet:grid-col-5 signin-form">
            <h1>Sign In</h1>
            {error && (
              <Alert id="loginAlert" type="error" heading="Error">
                Login unsuccessful. Please try again.
              </Alert>
            )}
            {hasSsoConfig() && (
              <Button
                id="sign-in-sso"
                type="button"
                variant="outline"
                onClick={handleSsoSignIn}
              >
                Sign In with SSO
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
