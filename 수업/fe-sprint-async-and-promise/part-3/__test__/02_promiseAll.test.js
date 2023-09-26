if (typeof window === 'undefined') {
  const getNewsAndWeatherAll = require('../02_promiseAll');
  const expect = require('chai').expect;
}

describe('Promise.all Test', () => {
  describe('getNewsAndWeatherAll', () => {
    it('Promise 형태로 리턴되어야 합니다', () => {
      const result = getNewsAndWeatherAll();
      expect(result.constructor.name).to.equal('Promise');
    });

    it('Promise.all을 사용해서 풀어야 합니다', (done) => {
      getNewsAndWeatherAll()
        .then((json) => {
          expect(Promise.all.called).to.be.equal(true);
          done();
        })
        .catch(done);
    });

    it('/data/latest 의 응답 내용과 /data/weather 응답 내용을 합쳐 새로운 객체로 리턴되어야 합니다', (done) => {
      getNewsAndWeatherAll().then((json) => {
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
      }).catch(done);
    });
  });
});
