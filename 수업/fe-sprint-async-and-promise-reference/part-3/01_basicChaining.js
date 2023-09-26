var newsURL = 'http://localhost:4999/data/latestNews';
var weatherURL = 'http://localhost:4999/data/weather';

function getNewsAndWeather() {
  return fetch(newsURL)
    .then(resp => resp.json())
    .then(json1 => {
      return fetch(weatherURL)
        .then(resp => resp.json())
        .then(json2 => {
          return {
            news: json1.data,
            weather: json2
          }
        });
    })
}

if (typeof window === 'undefined') {
  module.exports = {
    getNewsAndWeather
  }
}