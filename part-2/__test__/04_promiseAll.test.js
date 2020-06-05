const { readAllUsers } = require("../04_promiseAll");

describe("Promise.all Test", () => {
  describe('readAllUsers', () => {
    test('체이닝의 결과가 Promise 형태로 리턴되어야 합니다.', () => {
      const result = readAllUsers();
      expect(result.constructor.name).toBe('Promise');
    })
    test('user1.json의 내용과 user2.json 내용을 합쳐 객체로 리턴되어야 합니다', () => {
      readAllUsers().then(json => {
        const userArray = [
          {
            "name": "김코딩",
            "age": 26,
            "sex": "Male",
            "company": {
              "name": "코드스테이츠"
            }
          },
          {
            "name": "박해커",
            "age": 40,
            "sex": "Female",
            "company": {
              "name": "Anomymous"
            }
          }
        ]
        expect(json).toEqual(userArray);
      })
    })
  })
});
