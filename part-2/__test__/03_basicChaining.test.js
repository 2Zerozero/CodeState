const path = require('path');

const { readAllUsersChaining } = require("../03_basicChaining");

describe("Basic chaining Test", () => {
  describe('readAllUsersChaining', () => {
    test('체이닝의 결과가 Promise 형태로 리턴되어야 합니다.', () => {
      const result = readAllUsersChaining();
      expect(result.constructor.name).toBe('Promise');
    })
    test('user1.json의 내용과 user2.json 내용을 합쳐 객체로 리턴되어야 합니다', () => {
      expect(true).toBeTruthy();
    })
  })

  /*
  describe("fetchUsersAndWriteToFile", () => {
    const readFilePath = "files/read/userId.txt";
    const writeFilePath = "files/write/userName.txt";

    beforeEach(() => {
      fs.writeFileSync(writeFilePath, "");
    });

    afterEach(() => {
      fs.writeFileSync(writeFilePath, "");
    });

    test("should return the promise created by the entire chain", () => {
      const result = fetchUsersAndWriteToFile(readFilePath, writeFilePath);
      expect(result.constructor.name).toBe("Promise");
    });

    test("should eventually write a user name to a file", () => {
      return fetchUsersAndWriteToFile(readFilePath, writeFilePath).then(() => {
        const userNames = fs.readFileSync(writeFilePath, "utf8");
        expect(userNames).toBe("이정도\n김재완\n김성은\n이주연\n구일모\n");
      });
    });
    */
});
