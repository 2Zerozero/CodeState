const https = require('https')

const fetch = function (url) {
  return new Promise((resolve, reject) => {
    try {
      https.get(url, (res) => {
        let body = ''
        res.on('data', chunk => {
          body = body + chunk;
        });

        res.on('end', () => {
          body = JSON.parse(body.toString());
          resolve(body)
        });

      }).on('error', err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
};

module.exports = {
  fetch
};
