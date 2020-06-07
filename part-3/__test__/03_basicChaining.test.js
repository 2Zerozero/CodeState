const fs = require('fs');
const {
  readAllUsersChaining
} = require('../03_basicChaining');

describe('Chaining Test', () => {
  describe('readAllUsersChaining', () => {
    test('체이닝의 결과가 Promise 형태로 리턴되어야 합니다', () => {
      const result = readAllUsersChaining()
      expect(result.constructor.name).toBe('Promise');
    });

    test('/user/1의 내용과 /user/2 내용을 합쳐 객체로 리턴되어야 합니다', (done) => {
      readAllUsersChaining().then(json => {
        const userArray = [
          {
            "id": 1,
            "name": "김코딩"
          },
          {
            "id": 2,
            "name": "박해커"
          }
        ]
        expect(json).toEqual(userArray);
        done();
      });
    });


    test('http module을 직접 사용하는 것이 아닙니다', () => {
      const contents = fs.readFileSync('./part-3/03_basicChaining.js').toString();
      expect(contents).not.toMatch('require\("http"\)', 'g');
      expect(contents).not.toMatch("require\('http'\)", 'g');
    });

    test('fetch를 활용하세요. 총 두 번 사용해야 합니다', () => {
      expect(readAllUsersChaining.toString().match(/fetch/g)).toHaveLength(2);
    });

    test('Promise.all 또는 async/await 을 사용하지 않고 풀어보세요', () => {
      expect(readAllUsersChaining.toString()).not.toMatch(/Promise\.all/g);
      expect(readAllUsersChaining.toString()).not.toMatch(/await/g);
    })
  });
});
