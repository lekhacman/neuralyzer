module.exports = function createChrome() {
  function get(keys, cb) {
    return new Promise((resolve) => {
      console.log(`#get: ${keys}`);
      const storage = sessionStorage.getItem('syncStore') || '{}';
      resolve(cb(JSON.parse(storage)));
    });
  }

  function set(data, cb) {
    return new Promise((resolve) => {
      console.log(`#set: ${JSON.stringify(data)}`);
      sessionStorage.setItem('syncStore', JSON.stringify(data));
      resolve(cb(data));
    });
  }
  return {
    storage: {
      sync: { get, set },
    },
  };
};
