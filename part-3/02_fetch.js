const http = require('http')

const fetch = function (url) {
  return new Promise((resolve, reject) => {
    try {
      http.get(url, (res) => {
        let body = ''
        res.on('data', chunk => {
          body = body + chunk;
        });

        res.on('end', () => {
          resolve({
            json: () => {
              return JSON.parse(body.toString())
            }
          })
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
