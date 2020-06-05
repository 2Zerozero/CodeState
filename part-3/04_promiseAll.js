const { fetch } = require('./02_fetch');

const user1URL = 'http://localhost:4000/user/1';
const user2URL = 'http://localhost:4000/user/2';

const readAllUsers = () => {
  return Promise.all([
    fetch(user1URL),
    fetch(user2URL)
  ])
    .then(([user1, user2]) => {
      return [user1.json(), user2.json()]
    })
}

module.exports = {
  readAllUsers
}