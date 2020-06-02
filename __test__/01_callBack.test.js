const {
  getDataFromFile,
  getBodyFromGetRequest
} = require("../exercises/01_callBack");

describe("Callback Test", () => {
  describe("getDataFromFile", () => {
    test("should accept a callback as its last", done => {
      getDataFromFile("files/read/userId.txt", () => {
        expect(true).toBeTruthy();
        done();
      });
    });

    test("should invoke the callback with an error as the first argument", done => {
      getDataFromFile("files/read/non.txt", (err, data) => {
        expect(err.code).toBe("ENOENT");
        expect(data).toBeNull();
        done();
      });
    });

    test("should invoke the callback with the data as the second argument", done => {
      getDataFromFile("files/read/userId.txt", (err, data) => {
        expect(err).toBeNull();
        done();
      });
    });

    test("should return array", done => {
      getDataFromFile("files/read/userId.txt", (err, data) => {
        expect(err).toBeNull();
        expect(Array.isArray(data)).toBeTruthy();
        expect(data).toEqual(["1", "2", "3", "4", "5"]);
        done();
      });
    });
  });

  describe("getBodyFromGetRequest test with `KoreanJSON`", () => {
    test("should accept a callback as its last", done => {
      getBodyFromGetRequest("https://koreanjson.com/users/", () => {
        expect(true).toBeTruthy();
        done();
      });
    });

    test("should invoke the callback with an error as the first argument", done => {
      getBodyFromGetRequest("none", (err, body) => {
        expect(err.message).toBe('Invalid URL: none');
        expect(body).toBeNull();
        done();
      });
    });

    test("should invoke the callback with the first line as the second argument", done => {
      getBodyFromGetRequest("https://koreanjson.com/users/", (err, body) => {
        expect(err).toBeNull();
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0].name).toBe("이정도");
        done();
      });
    });
  });
});
