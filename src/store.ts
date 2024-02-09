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

const currentInvestigation = atom<Investigation>({
  key: 'currentInvestigation',
  default: {},
});

const searching = atom({
  key: 'searching',
  default: false,
});

const currentDataset = atom({
  key: 'currentDataset',
  default: 'document',
});

const currentMediaTypes = atom({
  key: 'currentMediaTypes',
  default: 'pdf',
});

const currentSearch = atom({
  key: 'currentSearch',
  default: '',
});

export {
  currentDataset,
  currentInvestigation,
  currentMediaTypes,
  currentSearch,
  currentUser,
  searching,
  signedIn,
};
