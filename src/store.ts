import { User } from '@src/types/user';
import { atom } from 'recoil';
import { Investigation } from './types/investigation';

const signedIn = atom({
  key: 'signedIn',
  default: false,
});

const currentUser = atom<User | undefined>({
  key: 'currentUser',
  default: undefined,
});

const currentInvestigation = atom<Investigation | undefined>({
  key: 'currentInvestigation',
  default: undefined,
});

export { currentInvestigation, currentUser, signedIn };
