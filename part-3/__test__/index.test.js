const supertest = require('supertest');
const { app, server } = require('./app');
const request = supertest(app);

describe('', () => {
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

  require('./01_callBack.test');
  require('./02_fetch.test');
  require('./03_basicChaining.test');
  require('./04_promiseAll.test');
  require('./05_asyncAwait.test');

  afterAll(() => {
    server.close();
  });
});
