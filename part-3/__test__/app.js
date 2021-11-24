const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const data = {
  "data": [
    { "row_id": 2, "title": "2021년 경제 성장률 전망 밝아", "source": "A신문", "timestamp": "2020/12/30" },
    { "row_id": 3, "title": "코로나19 증가추세 대폭 하락해", "source": "BBC", "timestamp": "2020/12/29" },
    { "row_id": 4, "title": "코드스테이츠 취업연계 파트너사 xxx건 돌파", "source": "스타트업 뉴스", "timestamp": "2020/12/31" }
  ]
};

app.get('/data/latestNews', async (req, res) => {
  res.status(200).json(data)
});

app.get('/data/weather', async (req, res) => {
  res.status(200).json({ "status": "sunny", "temperature": "28", "fineDust": "good" });
});

const server = app.listen(5000);

console.log('http://localhost:5000/data/latestNews 에서 뉴스를 얻을 수 있습니다');
console.log('http://localhost:5000/data/weather 에서 날씨를 얻을 수 있습니다');

module.exports = {
  app,
  server
}