import { PublicClientApplication } from '@azure/msal-browser';
import { app, authentication } from '@microsoft/teams-js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { msalConfig } from '../auth.config';
import { userData } from '../data/user';
import { currentUser, signedIn } from '../store';
import { User } from '../types/user';

const useAuth = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useRecoilState<boolean>(signedIn);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>();
  const [currentUserData, setCurrentUserData] = useRecoilState<
    User | undefined
  >(currentUser);

  const msalInstance = useMemo(
    () => new PublicClientApplication(msalConfig),
    [],
  );

  /* TODO: Uncomment for interacting with own API, no need to send tokens to external public API */
  // useEffect(() => {
  //   if (auth.user) {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.user.access_token;
  //   } else {
  //     axios.defaults.headers.common['Authorization'] = undefined;
  //   }
  // }, [auth.user]);

  const handleAuthenticationSuccess = useCallback(async () => {
    setCurrentUserData(userData);
    setIsSignedIn(true);
  }, [setCurrentUserData, setIsSignedIn]);

  useEffect(() => {
    const handleRedirectPromise = async () => {
      try {
        console.log('Handling redirect promise...');
        await msalInstance.initialize();
        const result = await msalInstance.handleRedirectPromise();
        console.log('RedirectPromise result:', result);
        if (result) {
          await handleAuthenticationSuccess();
        }
      } catch (error) {
        console.error('Error handling redirect:', error);
      }
    };

    handleRedirectPromise();
  }, [msalInstance, handleAuthenticationSuccess]);

  const authenticateOnWeb = useCallback(async () => {
    try {
      console.log('MSAL initializing');
      await msalInstance.initialize();
      const accounts = msalInstance.getAllAccounts();
      console.log('MSAL accounts:', accounts);
      if (accounts.length > 0) {
        console.log('Acquiring token silently');
        const silentResult = await msalInstance.acquireTokenSilent({
          scopes: ['User.Read'],
          account: accounts[0],
        });
        console.log('Silent result:', silentResult);
        await handleAuthenticationSuccess();
      } else {
        console.log('Performing login redirect');
        await msalInstance.loginRedirect({
          scopes: ['User.Read'],
        });
      }
    } catch (error) {
      setError('Authentication error:' + error);
      console.error('Authentication error:', error);
    }
  }, [msalInstance, handleAuthenticationSuccess]);

  const authenticateInTeams = useCallback(async () => {
    try {
      // Get client-side token
      const token = await authentication.getAuthToken();
      console.log('Teams client token:', token);
      handleAuthenticationSuccess();
    } catch (error) {
      console.error('Error during Teams SSO:', error);
      await authenticateOnWeb();
    }
  }, [handleAuthenticationSuccess, authenticateOnWeb]);

  const initializeTeamsApp = async () => {
    return Promise.race([
      app.initialize(),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('Teams SDK initialization timed out')),
          10000,
        ),
      ),
    ]);
  };

  const initializeUser = async () => {
    if (!currentUserData && !isAuthenticating) {
      setIsAuthenticating(true);
      console.log('Starting authentication...');
      try {
        const isInTeams = await initializeTeamsApp()
          .then(() => app.getContext())
          .catch(() => false);
        if (isInTeams) {
          console.log('Running in Teams');
          await authenticateInTeams();
        } else {
          console.log('Running in web');
          await authenticateOnWeb();
          setCurrentUserData(userData);
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        navigate('/');
      }
    }
  };

  const signIn = async () => {
    initializeUser();
  };

  const signOut = async () => {
    console.log('Signing out...');
  };

  return {
    isSignedIn,
    currentUserData,
    error,
    signIn,
    signOut,
  };
};

export default useAuth;
