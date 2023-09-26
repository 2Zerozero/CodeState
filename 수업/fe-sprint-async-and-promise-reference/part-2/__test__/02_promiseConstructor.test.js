const path = require('path');
const { getDataFromFilePromise } = require('../02_promiseConstructor');

const jsonPath = path.join(__dirname, '..', 'files/user1.json');
const user1txt = `{
  "name": "김코딩",
  "age": 26,
  "sex": "Male",
  "company": {
    "name": "코드스테이츠"
  }
}`;

describe('Promise Test', () => {
  describe('getDataFromFilePromise', () => {
    it('Promise 형태로 리턴되어야 합니다', () => {
      const result = getDataFromFilePromise(jsonPath);
      expect(result.constructor.name).toBe('Promise');
    });

    it('then 블록을 통하여 파일 내용이 전달되어야 합니다', (done) => {
      return getDataFromFilePromise(jsonPath)
        .then((data) => {
          expect(data).toBe(user1txt);
          done();
        })
        .catch(done);
    });

    it('에러가 발생할 경우, catch 블록을 통하여 에러 객체가 전달되어야 합니다', (done) => {
      return getDataFromFilePromise('nonexist').catch((err) => {
        expect(err.code).toBe('ENOENT');
        done();
      });
    });
  });
});
