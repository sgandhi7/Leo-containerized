import { AccountInfo } from '@azure/msal-browser';
import { User } from '../types/user';

export const userData: User = {
  firstName: 'Admin',
  lastName: '',
  displayName: 'Admin',
  emailAddress: 'admin@email.com',
};

export const azureUserData: AccountInfo = {
  homeAccountId: '1234',
  environment: 'prod',
  tenantId: '1234',
  username: 'admin',
  name: 'Admin User',
  idTokenClaims: {},
  idToken: '1234',
  localAccountId: '1234',
};
