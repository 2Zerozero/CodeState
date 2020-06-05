const http = require('http')

const getBodyFromGetRequest = function (url, callback) {
  try {
    http.get(url, (res) => {
      let body = ''
      res.on('data', chunk => {
        body = body + chunk;
      });

      res.on('end', () => {
        body = JSON.parse(body.toString());
        callback(null, body);
      });

    }).on('error', err => {
      callback(err, null);
    })
  } catch (err) {
    callback(err, null);
  }
};

module.exports = {
  getBodyFromGetRequest
};
