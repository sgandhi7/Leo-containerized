import { isMocked } from './api';

describe('Api', () => {
  beforeEach(() => {
    process.env.TXTAI_API_URL = undefined;
  });

  it('should not get isMocked when environment variable present', () => {
    process.env.TXTAI_API_URL = 'http://localhost';
    const mocked = isMocked();
    expect(mocked).toEqual(false);
  });
});
