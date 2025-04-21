import { useMsal } from '@azure/msal-react';
import { app, authentication } from '@microsoft/teams-js';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userData } from '../data/user';
import { currentUserState, signedInState } from '../store';

const useAuth = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useRecoilState<boolean>(signedInState);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>();
  const [currentUserData, setCurrentUserData] =
    useRecoilState(currentUserState);

  const handleAuthenticationSuccess = useCallback(async () => {
    setCurrentUserData(userData);
    setIsSignedIn(true);
  }, [setCurrentUserData, setIsSignedIn]);

  const authenticateOnWeb = useCallback(async () => {
    try {
      console.log('MSAL initializing');
      // await instance.initialize();
      const accounts = instance.getAllAccounts();
      console.log('MSAL accounts:', accounts);
      if (accounts.length > 0) {
        console.log('Acquiring token silently');
        const silentResult = await instance.acquireTokenSilent({
          scopes: ['User.Read'],
          account: accounts[0],
        });
        console.log('Silent result:', silentResult);
        await handleAuthenticationSuccess();
      } else {
        console.log('Performing login redirect');
        await instance.loginRedirect({
          scopes: ['User.Read'],
        });
      }
    } catch (error) {
      setError('Authentication error:' + error);
      console.error('Authentication error:', error);
    }
  }, [instance, handleAuthenticationSuccess]);

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
