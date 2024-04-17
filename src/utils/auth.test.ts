import { AccountInfo } from '@azure/msal-browser';
import { azureUserData } from '@src/data/user';
import { generateGUID } from './api';
import { getDisplayName, getSignInRedirectUrl, hasSsoConfig } from './auth';

describe('Auth Helpers', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  test('should get display name with display name', () => {
    const displayName = getDisplayName(azureUserData);
    expect(displayName).toEqual(azureUserData.name);
  });

  test('should get empty display name', () => {
    const newUser: AccountInfo = {
      ...azureUserData,
      name: undefined,
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
    process.env.SSO_TENANT_ID = 'http://localhost';
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
