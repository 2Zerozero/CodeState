const {
  getBodyFromGetRequestPromise,
  getDataFromFilePromise
} = require("../exercises/02_promiseConstructor");

describe("Promise Test", () => {
  describe("getBodyFromGetRequestPromise", () => {
    const requestUrl = "https://koreanjson.com/posts/1";

    it("should return a promise", () => {
      const result = getBodyFromGetRequestPromise(requestUrl);
      expect(result.constructor.name).toBe("Promise");
    });

    it("should get a response body in the `then` block", () => {
      return getBodyFromGetRequestPromise(requestUrl).then(body => {
        expect(body).toBeInstanceOf(Object);
        expect(body.title).toBe(
          "정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다."
        );
      });
    });

    it("should catch errors in the `catch` block", () => {
      return getBodyFromGetRequestPromise("none").catch(err => {
        expect(err.message).toBe('Invalid URI "none"');
      });
    });
  });

  describe("getDataFromFilePromise", () => {
    const filePath = "files/read/userId.txt";

    it("should return a promise", () => {
      const result = getDataFromFilePromise(filePath);
      expect(result.constructor.name).toBe("Promise");
    });

    it("should get data available in the `then` block", () => {
      return getDataFromFilePromise(filePath).then(data => {
        expect(Array.isArray(data)).toBeTruthy();
        expect(data).toEqual(["1", "2", "3", "4", "5"]);
      });
    });

    it("should catch any errors in the `catch` block", () => {
      return getDataFromFilePromise(filePath + "none").catch(err => {
        expect(err.code).toBe("ENOENT");
      });
    });
  });
});
