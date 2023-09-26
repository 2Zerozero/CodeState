const { readFile } = require("fs");

const getDataFromFile = function (filePath, callback) {
  readFile(filePath, "utf8", function (err, text) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, text);
    }
  });
};

// getDataFromFile('README.md', (err, data) => console.log(data));

module.exports = {
  getDataFromFile
};
