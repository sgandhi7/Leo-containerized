import { atom } from 'recoil';
import { Chat } from './types/chat';
import { User } from './types/user';

const signedInState = atom({
  key: 'signedIn',
  default: false,
});

const currentUserState = atom<User | undefined>({
  key: 'currentUser',
  default: undefined,
});

const currentChatState = atom<Chat>({
  key: 'currentChat',
  default: {},
});

const searchingState = atom({
  key: 'searching',
  default: false,
});

const currentSearchState = atom({
  key: 'currentSearch',
  default: '',
});

export {
  currentChatState,
  currentSearchState,
  currentUserState,
  searchingState,
  signedInState,
};
