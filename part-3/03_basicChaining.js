const { fetch } = require('./02_fetch');

const user1URL = 'http://localhost:4000/user/1';
const user2URL = 'http://localhost:4000/user/2';

const readAllUsersChaining = () => {
  return fetch(user1URL)
    .then(resp => resp.json())
    .then(json1 => {
      return fetch(user2URL)
        .then(resp => resp.json())
        .then(json2 => {
          return [json1, json2]
        });
    })
}

module.exports = {
  readAllUsersChaining
}