const { getDataFromFilePromise } = require('./02_promiseConstructor');

const readAllUsersChaining = () => {
  return getDataFromFilePromise('files/user1.json')
    .then(user1 => {
      return getDataFromFilePromise('files/user2.json').then(user2 => {
        return '[' + user1 + ',' + user2 + ']';
      });
    })
    .then(text => JSON.parse(text))
    .then(json => {
      console.log(json);
    });
}

readAllUsersChaining();

module.exports = {
  readAllUsersChaining
}