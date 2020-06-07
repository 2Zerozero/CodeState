const fs = require("fs");

const getDataFromFilePromise = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", function (err, file) {
      if (err) {
        reject(err);
      } else {
        resolve(file.toString());
      }
    });
  });
};

// getDataFromFilePromise('README.md').then(data => console.log(data));

module.exports = {
  getDataFromFilePromise
};
