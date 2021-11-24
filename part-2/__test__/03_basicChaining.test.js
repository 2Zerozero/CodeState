const fs = require('fs');
const { readAllUsersChaining } = require('../03_basicChaining');
const sinon = require('sinon');
sinon.spy(Promise, 'all');
sinon.spy(fs, 'readFile');
sinon.spy(fs, 'readFileSync');
beforeEach(function () {
  Promise.all.resetHistory();
  fs.readFile.resetHistory();
  fs.readFileSync.resetHistory();
});

// delete comments
const MULTI_LINES_COMMENT = /\/\*[\s\S]*?\*\/(\r?\n|\r)/;
const ONE_LINE_COMMENT = /\/\/.*(\r?\n|\r)/;
const COMMENT = new RegExp(
  `${MULTI_LINES_COMMENT.source}|${ONE_LINE_COMMENT.source}`,
  'g'
);
const funcBody = readAllUsersChaining.toString().replace(COMMENT, '');

describe('Basic chaining Test', () => {
  describe('readAllUsersChaining', () => {
    test('체이닝의 결과가 Promise 형태로 리턴되어야 합니다', () => {
      const result = readAllUsersChaining();
      expect(result.constructor.name).toBe('Promise');
    });

    test('user1.json의 내용과 user2.json 내용을 합쳐 객체로 리턴되어야 합니다', (done) => {
      readAllUsersChaining()
        .then((json) => {
          const userArray = [
            {
              name: '김코딩',
              age: 26,
              sex: 'Male',
              company: {
                name: '코드스테이츠',
              },
            },
            {
              name: '박해커',
              age: 40,
              sex: 'Female',
              company: {
                name: 'Anonymous',
              },
            },
          ];
          expect(json).toEqual(userArray);
          done();
        })
        .catch(done);
    });

    test('fs module을 직접 사용하지 말고, getDataFromFilePromise을 두 번 사용해야 합니다', () => {
      let matched = funcBody.match(/getDataFromFilePromise\(.+?\)/g) || [];
      expect(matched.length).toBe(2);

      matched =
        funcBody.match(
          /fs\.readFile(Sync)?|fs\[(\'|\")readFile(Sync)?(\'|\")\]/g
        ) || [];
      expect(matched.length).toBe(0);
    });

    it('Promise.all 또는 async/await을 사용하지 않고 풀어보세요', (done) => {
      readAllUsersChaining()
        .then((json) => {
          expect(Promise.all.called).toBe(false);
          const matched = funcBody.match(/await/g) || [];
          expect(matched.length).toBe(0);
          done();
        })
        .catch(done);
    });
  });
});
