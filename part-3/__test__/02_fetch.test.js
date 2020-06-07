const {
  fetch
} = require('../02_fetch');

describe('Promise Test', () => {
  describe('fetch', () => {
    test('fetch 성공시 then을 통해 넘겨주는 응답 객체는 json 메소드를 포함합니다', done => {
      fetch('http://localhost:4000/user/1')
        .then(resp => {
          expect(typeof resp.json).toBe('function')
          done();
        })
    });

    test('응답 객체의 json 메소드는 응답 텍스트를 json으로 변환합니다', done => {
      fetch('http://localhost:4000/user/1')
        .then(resp => resp.json())
        .then(json => {
          expect(json).toEqual({
            id: 1,
            name: '김코딩'
          })
          done();
        });
    });

    test('fetch 실패시 catch 블록을 통해 에러 객체를 반환합니다', done => {
      fetch('http://nonexist')
        .then(resp => resp.json())
        .catch(err => {
          expect(err).toBeDefined();
          expect(err.toString()).toContain('ENOTFOUND')
          done();
        });
    });
  });
});
