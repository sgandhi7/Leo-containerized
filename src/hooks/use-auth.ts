import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { getFirstName, getLastName } from '@src/utils/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginRequest } from '../../src/auth.config';
import { userData } from '../data/user';
import { currentUser, signedIn } from '../store';
import { User } from '../types/user';

const useAuth = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useRecoilState<boolean>(signedIn);
  const [error, setError] = useState<string | null>();
  const [currentUserData, setCurrentUserData] = useRecoilState<
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
    if (isAuthenticated && window.location.pathname === '/signin') {
      setIsSignedIn(true);
      navigate('/');
    }
  });

  useEffect(() => {
    const profile = instance.getActiveAccount();
    /* istanbul ignore next */
    if (profile) {
      setCurrentUserData({
        firstName: getFirstName(profile),
        lastName: getLastName(profile),
        displayName: profile.name,
        emailAddress: profile.username,
        phoneNumber: '',
      });
    }
  }, [instance, setCurrentUserData]);

  const signIn = (isSso: boolean): void => {
    if (isSso) {
      instance
        .loginRedirect(loginRequest)
        .then(() => {
          setIsSignedIn(true);
          navigate('/');
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      setIsSignedIn(true);
      setCurrentUserData(userData);
      navigate('/');
    }
  };

  const signOut = (): void => {
    setIsSignedIn(false);
    setCurrentUserData({} as User);
    /* istanbul ignore next */
    if (isAuthenticated) {
      instance
        .logoutRedirect(loginRequest)
        .then(() => {
          setIsSignedIn(false);
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      setIsSignedIn(false);
      setCurrentUserData({} as User);
    }
  };

  return { isSignedIn, currentUserData, error, signIn, signOut };
};

export default useAuth;
