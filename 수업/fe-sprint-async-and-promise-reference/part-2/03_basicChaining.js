const path = require('path');
const { getDataFromFilePromise } = require('./02_promiseConstructor');

const user1Path = path.join(__dirname, 'files/user1.json');
const user2Path = path.join(__dirname, 'files/user2.json');

const readAllUsersChaining = () => {
  return getDataFromFilePromise(user1Path)
    .then(user1 => {
      return getDataFromFilePromise(user2Path).then(user2 => {
        return '[' + user1 + ',' + user2 + ']';
      });
    })
    .then(text => JSON.parse(text))
}

// readAllUsersChaining();

module.exports = {
  readAllUsersChaining
}