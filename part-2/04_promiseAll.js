const { getDataFromFilePromise } = require('./02_promiseConstructor');

const readAllUsers = () => {
  return Promise.all([
    getDataFromFilePromise('../files/user1.json'),
    getDataFromFilePromise('../files/user2.json')
  ])
    .then(([user1, user2]) => {
      return '[' + user1 + ',' + user2 + ']';
    })
    .then(text => JSON.parse(text))
    .then(json => {
      console.log(json);
    })
}

readAllUsers();

module.exports = {
  readAllUsers
}