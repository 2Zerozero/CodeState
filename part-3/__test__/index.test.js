const supertest = require('supertest');
const { app, server } = require('./app');
const request = supertest(app);

describe('서버가 잘 작동되어야 합니다 (이 테스트가 실패하면 다른 문제가 있는겁니다)', () => {
  afterAll(() => {
    server.close();
  });

  test('요청에 대한 응답이 정상적으로 전달되어야 합니다', done => {
    request.get('/user/1')
      .then(resp => {
        expect(resp.status).toBe(200);
        expect(resp.body.name).toBe('김코딩');
        done();
      });
  })

  test('잘못된 요청이라도 응답이 전달됩니다 (404 Not Found)', done => {
    request.get('/user/5')
      .then(resp => {
        expect(resp.status).toBe(404);
        done();
      });
  })
});