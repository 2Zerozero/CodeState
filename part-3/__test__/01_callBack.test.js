const path = require('path');
const {
  getBodyFromGetRequest
} = require("../getBodyFromGetRequest");

describe("callback Test", () => {
  describe("getBodyFromGetRequest", () => {
    test("/user/1 GET 요청을 보내면 해당 사용자를 반환힙니다", done => {
      getBodyFromGetRequest('/user/1', (resp) => {
        expect(resp).toEqual({
          id: 1,
          name: '김코딩'
        });
        done();
      });
    });

    test("에러가 발생할 경우, callback 첫번째 인자에 에러 객체가 전달되어야 합니다", done => {
      getDataFromFile('nonexist', (err, data) => {
        expect(err.code).toBe("ENOENT");
        expect(data).toBeNull();
        done();
      });
    });

    test("callback 두번째 인자에 파일 내용이 전달되어야 합니다", done => {
      getDataFromFile(jsonPath, (err, data) => {
        expect(err).toBeNull();
        expect(data).toBe(user1txt);
        done();
      });
    });
  });
});
