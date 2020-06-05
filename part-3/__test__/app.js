const express = require('express');
const app = express();

let users = [
  {
    id: 1,
    name: '김코딩'
  },
  {
    id: 2,
    name: '박해커'
  },
  {
    id: 3,
    name: '박성용'
  },
  {
    id: 4,
    name: '이호용'
  }
]

app.get('/user/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users[id - 1];

  if (!users.some(user => user.id === id)) {
    res.status(404).json({ err: 'id에 해당하는 사용자가 없습니다' });
  } else {
    res.status(200).json(user)
  }
});

const server = app.listen(4000, function () {
  console.log('Server is working : PORT - ', 4000);
});

module.exports = {
  app,
  server
}