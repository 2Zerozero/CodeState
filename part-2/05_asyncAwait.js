const { getDataFromFilePromise } = require('./02_promiseConstructor');

const readAllUsersAsyncAwait = async () => {

  let user1 = await getDataFromFilePromise('../files/user1.json');
  let user2 = await getDataFromFilePromise('../files/user2.json');

  let text = '[' + user1 + ',' + user2 + ']';
  let json = JSON.parse(text);
  console.log(json);
}

readAllUsersAsyncAwait();

module.exports = {
  readAllUsersAsyncAwait
}