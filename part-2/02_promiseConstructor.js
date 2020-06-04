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

module.exports = {
  getDataFromFilePromise
};
