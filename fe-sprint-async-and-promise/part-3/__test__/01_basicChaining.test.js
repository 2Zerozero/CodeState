if (typeof window === 'undefined') {
  const getNewsAndWeather = require('../01_basicChaining');
  const expect = require('chai').expect;
}

describe('Chaining Test', () => {
  describe('getNewsAndWeather', () => {
    it('체이닝의 결과가 Promise 형태로 리턴되어야 합니다', () => {
      const result = getNewsAndWeather();
      expect(result.constructor.name).to.equal('Promise');
    });

    it('/data/latest 의 응답 내용과 /data/weather 응답 내용을 합쳐 새로운 객체로 리턴되어야 합니다', (done) => {
      getNewsAndWeather()
        .then((json) => {
          const obj = {
            news: [
              {
                row_id: 2,
                title: '2021년 경제 성장률 전망 밝아',
                source: 'A신문',
                timestamp: '2020/12/30',
              },
              {
                row_id: 3,
                title: '코로나19 증가추세 대폭 하락해',
                source: 'BBC',
                timestamp: '2020/12/29',
              },
              {
                row_id: 4,
                title: '코드스테이츠 취업연계 파트너사 xxx건 돌파',
                source: '스타트업 뉴스',
                timestamp: '2020/12/31',
              },
            ],
            weather: { status: 'sunny', temperature: '28', fineDust: 'good' },
          };
          expect(json).to.deep.equal(obj);
          done();
        })
        .catch(done);
    });

    it('fetch를 활용하세요. 총 두 번 사용해야 합니다', (done) => {
      getNewsAndWeather()
        .then((json) => {
          expect(fetch.callCount).to.be.equal(2);
          done();
        })
        .catch(done);
    });

    const funcBody = deleteComments(getNewsAndWeather);
    it('Promise.all 또는 async/await을 사용하지 않고 풀어보세요', (done) => {
      getNewsAndWeather()
        .then((json) => {
          expect(Promise.all.called).to.be.equal(false);
          expect(funcBody).not.to.match(/await/g);
          done();
        })
        .catch(done);
    });
  });
});
