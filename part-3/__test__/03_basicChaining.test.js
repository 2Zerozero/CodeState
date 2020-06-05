const {
  readAllUsersChaining
} = require('../03_basicChaining');

describe('Chaining Test', () => {
  describe('readAllUsersChaining', () => {
    test('체이닝의 결과가 Promise 형태로 리턴되어야 합니다.', () => {
      const result = readAllUsersChaining()
      expect(result.constructor.name).toBe('Promise');
    })
    test('user1.json의 내용과 user2.json 내용을 합쳐 객체로 리턴되어야 합니다', (done) => {
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
      })
    });
  });
});
