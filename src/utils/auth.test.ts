import { userData } from '@src/data/user';
import { User } from '@src/types/user';
import { generateGUID } from './api';
import { getDisplayName, getSignInRedirectUrl, hasSsoConfig } from './auth';

describe('Auth Helpers', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  test('should get display name with display name', () => {
    const displayName = getDisplayName(userData);
    expect(displayName).toEqual(userData.displayName);
  });

  test('should get display name with first and last', () => {
    const newUser: User = {
      ...userData,
      displayName: undefined,
    };

    const displayName = getDisplayName(newUser);
    expect(displayName).toEqual(userData.displayName);
  });

  test('should get display name with just first name', () => {
    const newUser: User = {
      ...userData,
      displayName: undefined,
      lastName: undefined,
    };
    const displayName = getDisplayName(newUser);
    expect(displayName).toEqual(userData.firstName);
  });

  test('should get empty display name', () => {
    const newUser: User = {
      ...userData,
      displayName: undefined,
      lastName: undefined,
      firstName: undefined,
    };

    const displayName = getDisplayName(newUser);
    expect(displayName).toEqual('');
  });

  test('should get a signin URL', () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    });

    const url = getSignInRedirectUrl();
    expect(url).toEqual('http://localhost/signin');
  });

  test('should verify no SSL config', () => {
    const hasConfig = hasSsoConfig();
    expect(hasConfig).toBeFalsy();
  });

  test('should verify SSL config', () => {
    process.env.SSO_AUTHORITY = 'http://localhost';
    process.env.SSO_CLIENT_ID = 'dev-client';

    const hasConfig = hasSsoConfig();
    expect(hasConfig).toBeTruthy();
  });

  test('generateGUID', () => {
    const guid = generateGUID();
    expect(guid).toHaveLength(36);
    expect(guid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });
});
