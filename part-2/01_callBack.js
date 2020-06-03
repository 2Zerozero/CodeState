const fs = require("fs");

/*
 * 아래 함수는 파일에 있는 데이터들을 한 줄 씩 Array에 담아 callback 함수에 주어야합니다.
 *
 * 예)
 *
 * 파일 내용
 * 윤상호
 * 구일모
 * 이호용
 * 정진석, 박준홍
 * 최규홍
 *
 * callback 함수에 넘겨 줄 Array
 * ["윤상호", "구일모", "이호용", "정진석, 박준홍", "최규홍"]
 */
const getDataFromFile = function(filePath, callback) {
  fs.readFile(filePath, "utf8", function(err, file) {
    if (err) {
      callback(err, null);
    } else {
      const dataArray = file.split("\n");
      callback(null, dataArray);
    }
  });
};

module.exports = {
  getDataFromFile: getDataFromFile
};
