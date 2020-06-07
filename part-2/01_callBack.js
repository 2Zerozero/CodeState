const fs = require("fs");

const getDataFromFile = function (filePath, callback) {
  fs.readFile(filePath, "utf8", function (err, file) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, file.toString());
    }
  });
};

// getDataFromFile('README.md', (err, data) => console.log(data));

module.exports = {
  getDataFromFile
};
