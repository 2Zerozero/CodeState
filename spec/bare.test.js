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

describe('유어클레스 레슨의 예를 통과합니다.', function () {
  beforeEach(function () {
    const display = window.document.querySelector('.calculator__display');
    window.firstNum = undefined;
    window.operator = undefined;
    window.previousNum = undefined;
    window.previousKey = undefined;
    display.textContent = '0';
  });
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

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const numberButtons = [...window.document.querySelectorAll('.number')];
  const operators = ['+', '-', '*', '/'];
  const operatorButtons = [...window.document.querySelectorAll('.operator')];
  const decimalButton = window.document.querySelector('.decimal');
  const clearButton = window.document.querySelector('.clear');
  const enterButton = window.document.querySelector('.calculate');
  const allButtons = [clearButton, enterButton, decimalButton, ...numberButtons, ...operatorButtons];

  describe('Step 1 - 숫자 버튼을 누르고 화면에 숫자를 입력하기', function () {
    it('숫자 버튼을 눌렀을 때, 계산기 화면에 숫자가 보여야 합니다.', function (done) {
      const test = ['7', '7'];
      const clicks = test.slice(0, -1);
      const displayedResult = test.slice(-1)[0];
      const display = window.document.querySelector('.calculator__display');
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });
      expect(display.textContent).to.equal(displayedResult);
      done();
    });

    it('숫자 버튼을 여러 번 눌렀을 때, 계산기 화면에 숫자가 이어붙여져야(concatenation) 합니다.', function (done) {
      const test = ['7', '0', '0', '0', '7000'];
      const clicks = test.slice(0, -1);
      const displayedResult = test.slice(-1)[0];
      const display = window.document.querySelector('.calculator__display');
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });
      expect(display.textContent).to.equal(displayedResult);
      done();
    });
  });

  describe('Step 2 - Enter 버튼을 눌러 계산하고, AC 버튼으로 초기화 시키기', function () {
    it('연산자 버튼을 눌렀을 때, 계산기 화면에 보이는 숫자를 따로 저장하고 계산할 준비해야 합니다.', function (done) {
      const test = ['7', '0', '0', '0', '*', '7000'];
      const clicks = test.slice(0, -1);
      const displayedResult = test.slice(-1)[0];
      const display = window.document.querySelector('.calculator__display');
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });
      const firstNum = window.firstNum;
      expect(firstNum).to.equal('7000');
      expect(display.textContent).to.equal(displayedResult);
      done();
    });

    it('Enter 버튼을 눌렀을 때, 계산기 화면에 보이는 숫자와 따로 저장된 숫자를 함께 조합하여 계산한 결과를 화면에 보여줘야 합니다.', function (done) {
      const test = ['7', '0', '0', '0', '*', '6', 'Enter', '42000'];
      const clicks = test.slice(0, -1);
      const displayedResult = test.slice(-1)[0];
      const display = window.document.querySelector('.calculator__display');
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });
      expect(display.textContent).to.equal(displayedResult);
      done();
    });

    describe('AC 버튼이 잘 클릭 되는지 테스트 합니다.', function () {
      afterEach(function () {
        clearButton.dispatchEvent(clickEvent);
      });

      it(`AC가 표시된 버튼을 클릭하면 초기화가 되어야 합니다.`, function (done) {
        const display = window.document.querySelector('.calculator__display');
        display.textContent = 'Something strange';
        const clearButton = window.document.querySelector('.clear');
        clearButton.dispatchEvent(clickEvent);

        expect(window.firstNum).to.be.undefined;
        expect(window.operator).to.be.undefined;
        expect(display.textContent).to.equal('0');
        done();
      });
    });
  });
});

describe('calculate 함수를 검사합니다.', function () {
  describe('정수의 연산을 테스트 합니다.', function () {
    describe('덧샘 연산을 검사합니다', function () {
      const operator = '+';
      const testArr = [
        { firstNum: '1', displayedNum: '2', result: 3 },
        { firstNum: '9492', displayedNum: '848946', result: 858438 },
        { firstNum: '1028', displayedNum: '1231', result: 2259 },
        { firstNum: '100', displayedNum: '1100', result: 1200 },
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
        { firstNum: '1', displayedNum: '2', result: -1 },
        { firstNum: '9492', displayedNum: '9492', result: 0 },
        { firstNum: '1111', displayedNum: '1100', result: 11 },
        { firstNum: '1100', displayedNum: '1000', result: 100 },
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
        { firstNum: '1', displayedNum: '2', result: 2 },
        { firstNum: '9492', displayedNum: '231', result: 2192652 },
        { firstNum: '100', displayedNum: '100', result: 10000 },
        { firstNum: '100', displayedNum: '1', result: 100 },
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
        { firstNum: '4', displayedNum: '2', result: 2 },
        { firstNum: '100', displayedNum: '10', result: 10 },
        { firstNum: '2048', displayedNum: '1024', result: 2 },
        { firstNum: '28972456', displayedNum: '2323', result: 12472 },
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

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const numberButtons = [...window.document.querySelectorAll('.number')];
  const operators = ['+', '-', '*', '/'];
  const operatorButtons = [...window.document.querySelectorAll('.operator')];
  const decimalButton = window.document.querySelector('.decimal');
  const clearButton = window.document.querySelector('.clear');
  const enterButton = window.document.querySelector('.calculate');
  const allButtons = [clearButton, enterButton, decimalButton, ...numberButtons, ...operatorButtons];

  describe('숫자 버튼이 잘 클릭 되는지 테스트 합니다.', function () {
    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    for (let i = 0; i < numbers.length; i += 1) {
      it(`${numbers[i]}이(가) 표시된 버튼을 클릭하면 ${numbers[i]}이(가) 계산기 디스플레이에 표시되어야 합니다.`, function (done) {
        const button = getButtonBy(numbers[i], numberButtons);
        const display = window.document.querySelector('.calculator__display');
        display.textContent = '0';

        button.dispatchEvent(clickEvent);
        expect(display.textContent).to.equal(numbers[i]);
        done();
      });
    }
  });

  describe('연산자 버튼이 잘 클릭 되는지 테스트 합니다.', function () {
    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    for (let i = 0; i < operators.length; i += 1) {
      it(`${operators[i]}이(가) 표시된 버튼을 클릭하면 ${operators[i]}이(가) 변수 operator에 할당 되어야 합니다.`, function (done) {
        const button = getButtonBy(operators[i], operatorButtons);
        button.dispatchEvent(clickEvent);

        const operator = window.operator;
        expect(operators[i]).to.equal(operator);
        done();
      });
    }
  });

  describe('AC 버튼이 잘 클릭 되는지 테스트 합니다.', function () {
    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    it(`AC가 표시된 버튼을 클릭하면 초기화가 되어야 합니다.`, function (done) {
      const display = window.document.querySelector('.calculator__display');
      display.textContent = 'Something strange';
      const clearButton = window.document.querySelector('.clear');
      clearButton.dispatchEvent(clickEvent);

      expect(window.firstNum).to.be.undefined;
      expect(window.operator).to.be.undefined;
      expect(window.previousNum).to.be.undefined;
      expect(display.textContent).to.equal('0');
      done();
    });
  });

  describe('기본적인 계산기의 기능을 검사합니다.', function () {
    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    const bareRequirementTests = [
      ['1', '1', '+', '1', 'Enter', '12'],
      ['1', '1', '-', '1', 'Enter', '10'],
      ['1', '5', '*', '4', 'Enter', '60'],
      ['9', '0', '/', '3', 'Enter', '30'],
      ['0', '+', '0', 'Enter', '0'],
    ];

    bareRequirementTests.forEach(function (test) {
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
