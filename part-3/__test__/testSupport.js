// testing the native fetch is possible ONLY in browsers
// that's because it's (browsers') native
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
