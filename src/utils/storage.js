const storage = {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  parseToArray(key) {
    return JSON.parse(localStorage.getItem(key));
  },
};

export { storage };
