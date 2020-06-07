const path = require('path');
const { getDataFromFilePromise } = require('./02_promiseConstructor');

const user1Path = path.join(__dirname, 'files/user1.json');
const user2Path = path.join(__dirname, 'files/user2.json');

const readAllUsersAsyncAwait = async () => {

  let user1 = await getDataFromFilePromise(user1Path);
  let user2 = await getDataFromFilePromise(user2Path);

  let text = '[' + user1 + ',' + user2 + ']';
  let json = JSON.parse(text);
  return json;
}

// readAllUsersAsyncAwait();

module.exports = {
  readAllUsersAsyncAwait
}