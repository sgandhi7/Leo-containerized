import { AccountInfo } from '@azure/msal-browser';
import { User } from '@src/types/user';

export const getDisplayName = (user: AccountInfo): string => {
  if (user.name) {
    return user.name;
  } else {
    return '';
  }
};

export const getFirstName = (user: AccountInfo): string => {
  if (user.name) {
    return user.name.split(' ')[0];
  } else {
    return '';
  }
};

export const getLastName = (user: AccountInfo): string => {
  if (user.name) {
    const name = user.name.split(' ');
    return name[length - 1];
  } else {
    return '';
  }
};

export const getAvatarInitials = (user: User | undefined): string => {
  if (!user?.firstName) {
    return '';
  }

  return user.firstName?.split('')[0].charAt(0).toUpperCase();
};

export const getSignInRedirectUrl = (): string => {
  return `${window.location.origin}/signin`;
};

export const hasSsoConfig = (): boolean => {
  return process.env.SSO_TENANT_ID && process.env.SSO_CLIENT_ID ? true : false;
};
