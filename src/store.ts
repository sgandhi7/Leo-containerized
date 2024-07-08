import { atom } from 'recoil';
import { Investigation } from './types/investigation';
import { User } from './types/user';

const signedIn = atom({
  key: 'signedIn',
  default: true,
});

const currentUser = atom<User | undefined>({
  key: 'currentUser',
  default: undefined,
});

const currentInvestigation = atom<Investigation>({
  key: 'currentInvestigation',
  default: {},
});

const filtering = atom({
  key: 'filtering',
  default: false,
});

const searching = atom({
  key: 'searching',
  default: false,
});

const currentDataset = atom<string[]>({
  key: 'currentDataset',
  default: ['document'],
});

const currentMediaTypes = atom<string[]>({
  key: 'currentMediaTypes',
  default: ['pdf'],
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
  filtering,
  searching,
  signedIn,
};
