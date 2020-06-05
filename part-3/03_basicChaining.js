const { getDataFromFilePromise } = require('./02_fetch');

const user1URL = '/user/1'
const user2URL = '/user/2'

const readAllUsersChaining = () => {
  // todo

  /* fetch 두번 써서

  [{
    id: 1,
    name: '김코딩'
  },
  {
    id: 2,
    name: '박해커'
  }]

  */
}

readAllUsersChaining();

module.exports = {
  readAllUsersChaining
}