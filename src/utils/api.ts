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

export const generateGUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
