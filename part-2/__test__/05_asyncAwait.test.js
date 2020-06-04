const fs = require("fs");

const { fetchUsersAndWriteToFileAsync } = require("../exercises/05_asyncAwait");

describe("Async & Await Test", () => {
  describe("fetchUsersAndWriteToFileAsync", () => {
    const readFilePath = "files/read/userId.txt";
    const writeFilePath = "files/write/userName.txt";

    beforeEach(() => {
      fs.writeFileSync(writeFilePath, "");
    });

    afterEach(() => {
      fs.writeFileSync(writeFilePath, "");
    });

    test("should return the promise created by the entire chain", () => {
      const result = fetchUsersAndWriteToFileAsync(readFilePath, writeFilePath);
      expect(result.constructor.name).toBe("Promise");
    });

    test("should eventually write a user name to a file", () => {
      return fetchUsersAndWriteToFileAsync(readFilePath, writeFilePath).then(
        () => {
          const userNames = fs.readFileSync(writeFilePath, "utf8");
          expect(userNames).toBe("이정도\n김재완\n김성은\n이주연\n구일모\n");
        }
      );
    });
  });
});
