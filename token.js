require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const { ACCESS_SECRET } = process.env;

const payload = {
  id: 1,
  title: "sth that you want to talk about",
};
// body

const token = sign(payload, ACCESS_SECRET, {
  expiresIn: "1d", // 1일간 유효한 토큰을 발행합니다.
});
console.log("token", token);

// 클라이언트에게 토큰을 건내줍니다.

// 아주 오랜 시간이 흐른 뒤
const secretKey = ACCESS_SECRET;

// 서버 유효한 토큰인지 확인합니다.

const decoded = verify(token, secretKey);
console.log("decoded", decoded);
