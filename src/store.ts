import { atom } from 'recoil';
import { Chat } from './types/chat';
import { User } from './types/user';

const signedIn = atom({
  key: 'signedIn',
  default: true,
});

const currentUser = atom<User | undefined>({
  key: 'currentUser',
  default: { firstName: 'Guest' } as User,
});

const currentChat = atom<Chat>({
  key: 'currentChat',
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

export { currentChat, currentSearch, currentUser, searching, signedIn };
