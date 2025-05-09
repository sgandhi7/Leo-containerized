// import { User } from '@src/types/user';
import { atom } from 'recoil';
import { Investigation, Session } from './types/investigation';
import { User } from './types/user';
const signedInState = atom({
  key: 'signedIn',
  default: false,
});

const currentUserState = atom<User | null | undefined>({
  key: 'currentUser',
  default: undefined,
});

const sessionId = atom<string | undefined>({
  key: 'sessionId',
  default: undefined,
});

const sessions = atom<Session[] | undefined>({
  key: 'sessions',
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

const currentSearch = atom({
  key: 'currentSearch',
  default: '',
});

const showDropdownMenu = atom({
  key: 'showDropdownMenu', // Unique ID for this atom
  default: false, // Default visibility is false
});

// Create a new atom to manage the AbortController
const abortController = atom<AbortController | null>({
  key: 'abortController',
  default: null,
  // Recoil does not automatically reset non-serializable objects like AbortController,
  // so it is typically set to null initially and created in components as needed.
});

const sasToken =
  'sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-05-31T12:24:46Z&st=2024-05-15T04:24:46Z&spr=https&sig=52T0X9ID22Z8KhGpTvPTpjOyBjU9hV5mC%2FTXeKdG%2Bes%3D';

export {
  abortController,
  currentInvestigation,
  currentSearch,
  currentUserState,
  sasToken,
  searching,
  sessionId,
  sessions,
  showDropdownMenu,
  signedInState,
};
