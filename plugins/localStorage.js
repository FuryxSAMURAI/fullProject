export default ({ app }, inject) => {
  if (process.client) {
    inject("localStorage", {
      set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
      },
      get(key) {
        return JSON.parse(localStorage.getItem(key));
      },
      remove(key) {
        localStorage.removeItem(key);
      },
    });
  }
};
