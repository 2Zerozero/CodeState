const { join } = require('path');
const { getDataFromFilePromise } = require('./02_promiseConstructor');

const user1Path = join(__dirname, 'files/user1.json');
const user2Path = join(__dirname, 'files/user2.json');

const readAllUsersAsyncAwait = async () => {
  const json = await Promise.all([
    getDataFromFilePromise(user1Path),
    getDataFromFilePromise(user2Path)
  ])
  .then(texts => texts.map(text => JSON.parse(text)))
  return json;
}

// readAllUsersAsyncAwait();

module.exports = {
  readAllUsersAsyncAwait
}