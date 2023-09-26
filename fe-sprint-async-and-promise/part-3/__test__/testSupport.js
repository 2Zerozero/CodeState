// fetch API는 현재 Node.js LTS 버전에서 지원하지 않아서, 브라우저 환경에서 테스트합니다.
sinon.spy(window, 'fetch');
sinon.spy(Promise, 'all');
beforeEach(function () {
  window.fetch.resetHistory();
  Promise.all.resetHistory();
});

// delete comment
const MULTI_LINES_COMMENT = /\/\*[\s\S]*?\*\/(\r?\n|\r)/;
const ONE_LINE_COMMENT = /\/\/.*(\r?\n|\r)/;
const COMMENT = new RegExp(
  `${MULTI_LINES_COMMENT.source}|${ONE_LINE_COMMENT.source}`,
  'g'
);

function deleteComments(func) {
  return func.toString().replace(COMMENT, '');
}
