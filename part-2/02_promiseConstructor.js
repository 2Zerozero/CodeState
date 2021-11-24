const { readFile } = require("fs");

const getDataFromFilePromise = filePath => {
  return new Promise((resolve, reject) => {
    readFile(filePath, "utf8", function (err, text) {
      if (err) {
        reject(err);
      } else {
        resolve(text);
      }
    });
  });
};

// getDataFromFilePromise('README.md').then(data => console.log(data));

module.exports = {
  getDataFromFilePromise
};
