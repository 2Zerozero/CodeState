const { readAllUsersAsyncAwait } = require("../05_asyncAwait");

describe("async/await Test", () => {
  describe('readAllUsersAsyncAwait', () => {
    test('async 키워드를 사용한 함수는 AsyncFunction의 인스턴스입니다', () => {
      const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
      expect(readAllUsersAsyncAwait).toBeInstanceOf(AsyncFunction);
    })

    test('await 키워드를 이용해 배열이 리턴되어야 합니다', async () => {
      const result = await readAllUsersAsyncAwait();
      expect(Array.isArray(result)).toBe(true);
    })

    test('user1.json의 내용과 user2.json 내용을 합쳐 배열로 리턴되어야 합니다', async () => {
      const result = await readAllUsersAsyncAwait();
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
      expect(result).toEqual(userArray);
    })
  })
});
