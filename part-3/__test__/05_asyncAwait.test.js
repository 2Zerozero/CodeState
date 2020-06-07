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

    test('/user/1의 응답 내용과 /user/2 응답 내용을 합쳐 배열로 리턴되어야 합니다', async () => {
      const result = await readAllUsersAsyncAwait();
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
      expect(result).toEqual(userArray);
    })
  })
});
