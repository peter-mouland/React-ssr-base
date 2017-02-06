function storageMock() {
  const storage = {};

  return {
    setItem(key, value) {
      storage[key] = value || '';
    },
    getItem(key) {
      return key in storage ? storage[key] : null;
    },
    removeItem(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key(i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}


module.exports = (function setMock(glob) {
  if (typeof localStorage === 'undefined' || localStorage === null) {
    glob.localStorage = storageMock();
    glob.sessionStorage = storageMock();
  }
  return glob.localStorage;
}(typeof window !== 'undefined' ? window : global));
