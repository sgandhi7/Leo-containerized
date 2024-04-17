import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginRequest } from 'src/auth.config';
import { userData } from '../data/user';
import { currentUser, signedIn } from '../store';
import { User } from '../types/user';

const useAuth = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [isSignedIn, setIsSignedIn] = useRecoilState<boolean>(signedIn);
  const [error, setError] = useState<string | null>();
  const [currentUserData, setCurrentUserDate] = useRecoilState<
    User | undefined
  >(currentUser);

  /* TODO: Uncomment for interacting with own API, no need to send tokens to external public API */
  // useEffect(() => {
  //   if (auth.user) {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.user.access_token;
  //   } else {
  //     axios.defaults.headers.common['Authorization'] = undefined;
  //   }
  // }, [auth.user]);

  useEffect(() => {
    /* istanbul ignore next */
    if (isAuthenticated) {
      setIsSignedIn(true);
    }
  }, [isAuthenticated, setIsSignedIn]);

  useEffect(() => {
    // const profile = auth.user?.profile;
    const profile = instance.getActiveAccount();
    /* istanbul ignore next */
    if (profile) {
      setCurrentUserDate({
        firstName: '',
        lastName: '',
        displayName: profile.name,
        emailAddress: profile.username,
        phoneNumber: '',
      });
    }
  }, [instance, setCurrentUserDate]);

  const signIn = (isSso: boolean): void => {
    if (isSso) {
      instance.loginRedirect(loginRequest).catch((err) => {
        setError(err);
      });
    } else {
      setIsSignedIn(true);
      setCurrentUserDate(userData);
    }
  };

  const signOut = (): void => {
    setIsSignedIn(false);
    setCurrentUserDate({} as User);
    /* istanbul ignore next */
    if (isAuthenticated) {
      instance.logoutRedirect().catch((err) => {
        setError(err);
      });
    } else {
      setIsSignedIn(false);
      setCurrentUserDate({} as User);
    }
  };

  return { isSignedIn, currentUserData, error, signIn, signOut };
};

export default useAuth;
