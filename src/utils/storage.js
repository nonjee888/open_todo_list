const storage = {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  fetchAll(key) {
    return localStorage.getItem(key);
  },
  parseToArray(key) {
    return JSON.parse(localStorage.getItem(key));
  },
};

export { storage };
