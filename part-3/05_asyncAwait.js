const { fetch } = require('./02_fetch');

const user1URL = 'http://localhost:4000/user/1';
const user2URL = 'http://localhost:4000/user/2';

const readAllUsersAsyncAwait = async () => {

  let user1 = await fetch(user1URL);
  let user2 = await fetch(user2URL);

  return [user1.json(), user2.json()];
}

module.exports = {
  readAllUsersAsyncAwait
}