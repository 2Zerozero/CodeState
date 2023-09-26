const crypto = require('crypto');

const HASH_ALGORITHM = 'sha256';
const yourSecretWord = 'foo';

const shasum = crypto.createHash(HASH_ALGORITHM);
shasum.update(yourSecretWord)

// https://en.wikipedia.org/wiki/Hash_function
// The values returned by a hash function are called hash values, hash codes, digests, or simple hashes.
const hash = shasum.digest('hex')
console.log('hash value', hash);

// 비밀번호 확인, 데이터 in
// https://en.wikipedia.org/wiki/Checksum


// 아래처럼 복호화가 가능할까요?
// const decrypted = crypto.verify(yourSecretWord, hash, 'foo');
// console.log('your secret', decrypted)

// --- salt ---
const shasum2 = crypto.createHash(HASH_ALGORITHM);

shasum2.update(yourSecretWord + "I'm a salt")
const hashWithSalt = shasum2.digest('hex')
console.log('hash value with salt', hashWithSalt);
