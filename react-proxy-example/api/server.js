const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

// place holder for the data
const books = [{
  book: "폭풍의 언덕",
  category: "영미/고전",
  author: "에밀리 브론테"
  }];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/books', (req, res) => {
  console.log('api/books called!')
  res.json(books);
});

app.post('/api/book', (req, res) => {
  const book = req.body.book;
  console.log('Adding book:::::', book);
  books.push(book);
  res.json("book added");
});

app.get('/', (req,res) => {
  res.send(`<h1>API Running on the port ${port}</h1>`);
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});