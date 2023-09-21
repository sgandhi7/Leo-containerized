export const isMocked = (): boolean => {
  const apiUrl = process.env.TXTAI_API_URL;
  /* istanbul ignore else */
  if (apiUrl) {
    return false;
  } else {
    console.log('Running local only...');
    return true;
  }
};
