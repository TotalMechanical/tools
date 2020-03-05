export const setLocal = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getLocal = key => {
  const item = window.localStorage.getItem(key);
  return JSON.parse(item);
};
