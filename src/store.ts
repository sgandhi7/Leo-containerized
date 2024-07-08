import { atom } from 'recoil';
import { Investigation } from './types/investigation';
import { User } from './types/user';

const signedIn = atom({
  key: 'signedIn',
  default: true,
});

const currentUser = atom<User | undefined>({
  key: 'currentUser',
  default: { firstName: 'Guest' } as User,
});

const currentInvestigation = atom<Investigation>({
  key: 'currentInvestigation',
  default: {},
});

const searching = atom({
  key: 'searching',
  default: false,
});

const currentSearch = atom({
  key: 'currentSearch',
  default: '',
});

export {
  currentInvestigation,
  currentSearch,
  currentUser,
  searching,
  signedIn,
};
