const fs = require('fs');
const path = require('path');
const cwd = process.cwd();

const { JSDOM } = require('jsdom');
const myLibrary = fs.readFileSync(path.join(cwd, '/src/script.js'), {
  encoding: 'utf-8',
});
const html = fs.readFileSync(path.join(cwd, '/src/calculator.html'));
const { expect } = require('chai');

let window;
window = new JSDOM(html, { runScripts: 'dangerously' }).window;

// Execute my library by inserting a <script> tag containing it.
const scriptEl = window.document.createElement('script');
scriptEl.textContent = myLibrary;
window.document.body.appendChild(scriptEl);

describe('calculate 함수를 검사합니다.', function () {
  describe('실수 연산을 테스트 합니다.', function () {
    describe('덧샘 연산을 검사합니다', function () {
      const operator = '+';
      const testArr = [
        { firstNum: '0.2341324', displayedNum: '0.91723', result: 1.1513624 },
        { firstNum: '0.1', displayedNum: '0.2', result: 0.30000000000000004 },
      ];

      for (let i = 0; i < testArr.length; i += 1) {
        const firstNum = testArr[i].firstNum;
        const displayedNum = testArr[i].displayedNum;
        const expected = testArr[i].result;

        it(`${firstNum}과 ${displayedNum}의 합은 ${expected}이여야 합니다.`, function () {
          const actual = window.calculate(firstNum, operator, displayedNum);
          expect(actual).to.be.equal(expected);
        });
      }
    });

    describe('뺄샘 연산을 검사합니다', function () {
      const operator = '-';
      const testArr = [
        { firstNum: '3.3', displayedNum: '3', result: 0.2999999999999998 },
        { firstNum: '120984.1', displayedNum: '0.12', result: 120983.98000000001 },
      ];
      for (let i = 0; i < testArr.length; i += 1) {
        const firstNum = testArr[i].firstNum;
        const displayedNum = testArr[i].displayedNum;
        const expected = testArr[i].result;

        it(`${firstNum}과 ${displayedNum}의 차는 ${expected}이여야 합니다.`, function () {
          const actual = window.calculate(firstNum, operator, displayedNum);
          expect(actual).to.be.equal(expected);
        });
      }
    });

    describe('곱샘 연산을 검사합니다', function () {
      const operator = '*';
      const testArr = [
        { firstNum: '0.124', displayedNum: '12.1231', result: 1.5032644000000002 },
        { firstNum: '12.13', displayedNum: '123.42', result: 1497.0846000000001 },
      ];
      for (let i = 0; i < testArr.length; i += 1) {
        const firstNum = testArr[i].firstNum;
        const displayedNum = testArr[i].displayedNum;
        const expected = testArr[i].result;

        it(`${firstNum}과 ${displayedNum}의 곱은 ${expected}이여야 합니다.`, function () {
          const actual = window.calculate(firstNum, operator, displayedNum);
          expect(actual).to.be.equal(expected);
        });
      }
    });

    describe('나눗샘 연산을 검사합니다', function () {
      const operator = '/';
      const testArr = [
        { firstNum: '1.5032644000000002', displayedNum: '0.124', result: 12.1231 },
        { firstNum: '1497.0846000000001', displayedNum: '12.13', result: 123.42 },
      ];
      for (let i = 0; i < testArr.length; i += 1) {
        const firstNum = testArr[i].firstNum;
        const displayedNum = testArr[i].displayedNum;
        const expected = testArr[i].result;

        it(`${firstNum}을 ${displayedNum}로 나눈 값은 ${expected}이여야 합니다.`, function () {
          const actual = window.calculate(firstNum, operator, displayedNum);
          expect(actual).to.be.equal(expected);
        });
      }
    });
  });
});

describe('계산기의 작동을 테스트 합니다.', function () {
  const getButtonBy = function (text, buttons) {
    const result = buttons.filter(function (button) {
      return button.textContent === text;
    });

    if (result.length > 1) {
      throw new Error('no extra buttons allowed');
    } else if (result.length < 1) {
      throw new Error('no button');
    }

    return result[0];
  };

  const clickEvent = new window.MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  // const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const numberButtons = [...window.document.querySelectorAll('.number')];
  // const operators = ['+', '-', '*', '/'];
  const operatorButtons = [...window.document.querySelectorAll('.operator')];
  const decimalButton = window.document.querySelector('.decimal');
  const clearButton = window.document.querySelector('.clear');
  const enterButton = window.document.querySelector('.calculate');
  const allButtons = [clearButton, enterButton, decimalButton, ...numberButtons, ...operatorButtons];

  describe('혹시 발생할 수 있는 특이한 작동 시 기능을 검사합니다.', function () {
    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    const consecutiveEnterTests = [
      ['3', '*', '3', 'Enter', 'Enter', 'Enter', 'Enter', '243'],
      ['3', '-', '3', 'Enter', 'Enter', 'Enter', 'Enter', '-9'],
      ['3', '+', '3', 'Enter', 'Enter', 'Enter', 'Enter', '15'],
      ['3', '/', '3', 'Enter', 'Enter', 'Enter', 'Enter', '0.037037037037037035'],
      ['3', 'Enter', 'Enter', 'Enter', '*', '3', 'Enter', '9'],
      ['3', 'Enter', 'Enter', 'Enter', '-', '3', 'Enter', '0'],
      ['3', 'Enter', 'Enter', 'Enter', '+', '3', 'Enter', '6'],
      ['3', 'Enter', 'Enter', 'Enter', '/', '3', 'Enter', '1'],
    ];

    const consecutiveOperatorTests = [
      ['3', '*', '*', '*', '*', '3', 'Enter', '9'],
      ['3', '-', '-', '-', '-', '3', 'Enter', '0'],
      ['3', '+', '+', '+', '+', '3', 'Enter', '6'],
      ['3', '/', '/', '/', '/', '3', 'Enter', '1'],
      ['3', '+', '-', '*', '/', '3', 'Enter', '1'],
      ['3', '/', '+', '-', '*', '3', 'Enter', '9'],
      ['3', '/', '/', '+', '-', '3', 'Enter', '0'],
      ['3', '*', '/', '-', '+', '3', 'Enter', '6'],
      ['3', '*', '3', 'Enter', '*', '*', '*', '9'],
      ['3', '-', '3', 'Enter', '-', '-', '-', '0'],
    ];

    const noSecondOperandTests = [
      ['3', '*', 'Enter', '9'],
      ['3', '-', 'Enter', '0'],
      ['7', '4', '2', '+', 'Enter', '1484'],
      ['8', '9', '1', '2', '/', 'Enter', '1'],
    ];

    const consecutiveDecimalTests = [
      ['3', '.', '.', '.', '.', '.', '2', '+', '3', 'Enter', '6.2'],
      ['3', '.', '.', '.', '.', '.', '2', '-', '2', 'Enter', '1.2000000000000002'],
      ['3', '.', '2', '1', '2', '4', '+', '2', '.', '1', '1', '2', '3', 'Enter', '5.3247'],
      ['6', '2', '3', '.', '1', '2', '9', '3', '8', '/', '1', '2', '4', 'Enter', '5.02523693548387'],
      ['1', '2', '.', '.', '.', '1', '2', '3', '8', '*', '2', '3', 'Enter', '278.8474'],
    ];

    const operatorDecimalTests = [
      ['5', '1', '-', '.', '1', '2', 'Enter', '50.88'],
      ['1', '0', '0', '/', '.', '5', 'Enter', '200'],
      ['1', '0', '0', '+', '.', '.', '5', 'Enter', '100.5'],
      ['1', '0', '0', '*', '.', '.', '5', 'Enter', '50'],
    ];

    const complicateConsecutiveCalculationTests = [
      // eslint-disable-next-line prettier/prettier
      ['1', '0', '0', '.', '.', '1', '2', '5', '2', '+', '1', '2', '+', '1', '5', '-', '-', '2', '3', '-', '1', '4', '4', '2', '/', '2', '3', '/', '/', '1', '2', '*', '2', '3', 'Enter', '-111.48956666666668'],
    ];

    const advancedTests = [
      ...consecutiveEnterTests,
      ...consecutiveOperatorTests,
      ...noSecondOperandTests,
      ...operatorDecimalTests,
      ...consecutiveDecimalTests,
      ...complicateConsecutiveCalculationTests,
    ];

    advancedTests.forEach(function (test) {
      const clicks = test.slice(0, -1);
      const displayedResult = test.slice(-1)[0];
      it(`${clicks}를 연속으로 누르면 ${displayedResult}이(가) 화면에 표시되어야 합니다.`, function (done) {
        const display = window.document.querySelector('.calculator__display');
        clicks.forEach(function (click) {
          const button = getButtonBy(click, allButtons);
          button.dispatchEvent(clickEvent);
        });
        expect(display.textContent).to.equal(displayedResult);
        done();
      });
    });
  });
});
