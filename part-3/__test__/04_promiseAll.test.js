const {
  readAllUsers
} = require('../04_promiseAll');

describe('Promise.all Test', () => {
  describe('readAllUsers', () => {
    test('Promise 형태로 리턴되어야 합니다', () => {
      const result = readAllUsers()
      expect(result.constructor.name).toBe('Promise');
    })

    test('Promise.all을 사용해서 풀어야 합니다', () => {
      expect(readAllUsers.toString()).toMatch(/Promise\.all/g);
    });

    test('/user/1의 응답 내용과 /user/2 응답 내용을 합쳐 배열로 리턴되어야 합니다', (done) => {
      readAllUsers().then(json => {
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
