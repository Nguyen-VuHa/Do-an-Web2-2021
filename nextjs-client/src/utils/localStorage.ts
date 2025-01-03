const setDataToLocalStore = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

const getDataToLocalStore = (key: string): string | null => {
  return window.localStorage.getItem(key);
};

const removeDataToLocalStore = (keysString: string) => {
  // keyString: 'key1,key2,key3'
  let arrKeys = keysString.split(",");

  arrKeys.map((key) => {
    window.localStorage.removeItem(key);
  });
};

export { setDataToLocalStore, getDataToLocalStore, removeDataToLocalStore };
