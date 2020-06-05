const {
  getBodyFromGetRequest
} = require("../01_callBack");

describe("callback Test", () => {
  describe("getBodyFromGetRequest", () => {
    test("/user/1 GET 요청을 보내면 두번째 인자를 통해 해당 사용자를 반환힙니다", done => {
      getBodyFromGetRequest('http://localhost:4000/user/1', (err, resp) => {
        expect(resp).toEqual({
          id: 1,
          name: '김코딩'
        });
        done();
      });
    });

    test("없는 URL에 GET 요청을 보내면 첫번째 인자를 통해 에러 객체를 반환합니다", done => {
      getBodyFromGetRequest('http://nonexist', (err) => {
        expect(err).toBeDefined();
        expect(err.toString()).toContain('ENOTFOUND');
        done();
      });
    });
  });
});
