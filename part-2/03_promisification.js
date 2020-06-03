const util = require("util");

const {
  getDataFromFile
} = require("../exercises/01_callBack");

const getDataFromFilePromise = util.promisify(getDataFromFile);

module.exports = {
  getDataFromFilePromise
};
