if (typeof window === 'undefined') {
  var getNewsAndWeatherAsync = require('../03_asyncAwait');
  var expect = require('chai').expect;
}

describe('async/await Test', () => {
  describe('getNewsAndWeatherAsync', () => {
    it('async 키워드를 사용한 함수는 AsyncFunction의 인스턴스입니다', () => {
      const AsyncFunction = Object.getPrototypeOf(async function () {})
        .constructor;
      expect(getNewsAndWeatherAsync).to.be.instanceOf(AsyncFunction);
    });

    it('/data/latest 의 응답 내용과 /data/weather 응답 내용을 합쳐 새로운 객체로 리턴되어야 합니다', async () => {
      const result = await getNewsAndWeatherAsync();
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
        weather: { status: "sunny", temperature: "28", fineDust: "good" },
      };
      expect(result).to.deep.equal(obj);
    });

    const funcBody = deleteComments(getNewsAndWeatherAsync);
    it('async/await을 활용하세요. 총 두 번 사용해야 합니다', () => {
      const match = funcBody.match(/await/g) || [];
      expect(match.length).to.be.equal(2);
    });
  });
});
