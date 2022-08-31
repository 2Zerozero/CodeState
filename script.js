const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector('.calculator__operend--left'); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector('.calculator__operend--right'); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector('.calculator__result'); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const option = document.querySelector('.decimal'); // '.' 을 불러온다.

function calculate(n1, operator, n2) {
  let result = 0;
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.

  // n1 n2 를 사칙연산을 하기 위해서 number 타입으로 변환한다. 
  // 만약 operator 가 + 를 받으면 n1 과 n2 를 더한다.
  // 만약 operator 가 - 를 받으면 n1 과 n2 를 뺀다.
  // 만약 operator 가 * 를 받으면 n1 과 n2 를 곱한다.
  // 만약 operator 가 / 를 받으면 n1 과 n2 를 나눈다.

  let num1 = parseFloat(n1);
  let num2 = parseFloat(n2);

  // 1. firstNum: 3, operator: -, previousNum: 3;
  // 2. firstNum: 0, operator: -, previousNum: 3;
  // 3. firstNum: -3, operator: -, previousNum: 3;
  // 3. firstNum: -6, operator: -, previousNum: 3;

  if (operator === "+") {
    result = num1 + num2; 
  }else if(operator === "-") {
    if(num2 < 0) {
      num2 = num2 * -1;
    }
    result = num1 - num2;
  }else if(operator === "*") {
    result = num1 * num2;
  }else if(operator === "/") {
    result = num1 / num2;
  }
  return String(result);
}

let isFirst = true;

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  if (target.matches('button')) {
    // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
    // 클릭된 HTML 엘리먼트가 button이면
    if (action === 'number') {
      // 그리고 버튼의 클레스가 number이면
      // 아래 코드가 작동됩니다.
      console.log('숫자 ' + buttonContent + ' 버튼');
      
      // 첫 번째 칸에, 입력된 내용이 있는지 없는지 구분한다.
      // 첫 번째 칸에, 입력된 내용이 0(기본값)이 아니라면, 이미 숫자가 있는 상태로 볼 수 있다.
      // 첫 번째 숫자가 0이 아닌 경우, 버튼을 클릭하면 두 번째 칸에 버튼에 적혀있는 숫자를 입력한다.
      if (isFirst){
        firstOperend.innerText = buttonContent;
        isFirst = false;
      }else{
        secondOperend.innerText = buttonContent;
      }
    }

    if (action === 'operator') {
      console.log('연산자 ' + buttonContent + ' 버튼');

    }

    if (action === 'decimal') {
      // console.log('소수점 버튼');
    }

    if (action === 'clear') {
      console.log('초기화 버튼');
      firstOperend.innerText = '0';
      secondOperend.innerText = '0';
      calculatedResult.innerText = '0';
      isFirst = true;
    }

    if (action === 'calculate') {
      console.log('계산 버튼');
      calculatedResult.innerText = calculate(firstOperend.innerText,operator.textContent,secondOperend.innerText);
    }
  }
});


// ! Advanced Challenge test와 Nightmare test를 위해서는 아래 주석을 해제하세요.

const display = document.querySelector('.calculator__display--for-advanced'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum, operatorForAdvanced, previousKey, previousNum;
let isDecimal = false; // '.' 을 판별하기 위해서 작성

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.

  // ! 여기서부터 Advanced Challenge & Nightmare 과제룰 풀어주세요.

  if (target.matches('button')) {
    if (action === 'number') {

      // 1. 만약 previousKey 가 'operator' 이면 두번째 칸의 텍스트 정보에 숫자를 입력한다.
      // 2. 현재 결과값을 초기화하면서 버튼의 값을 넣는다.
      if (previousKey === 'operator') {
        display.textContent = '0';
        previousKey = 'number'
      }

      // 계산기의 화면에 나타나있는 숫자가 '0'이면 아래의 코드를 실행합니다.
      if (display.textContent === '0') {
        console.log('숫자 ' + buttonContent + ' 버튼');
        display.textContent = buttonContent; // 계산기의 화면에 나타날 텍스트를 버튼의 텍스트로 변경합니다.
      } else {
        display.textContent += buttonContent;
      }

      previousNum = display.textContent;

    }
    if (action === 'operator') {
      //
      if (action === 'operator') {
        // 1. 변수 operatorForAdvanced에 버튼의 텍스트(연산자 기호, 여기서는 '*')를 할당합니다.
        // 2. operator를 입력하면 그 전에 있던 숫자를 저장한다.
        operatorForAdvanced = buttonContent;
        previousKey = 'operator';
        firstNum = previousNum;

        if ( operatorForAdvanced === 'x' || display.textContent === '0') {
          console.log('숫자 ' + buttonContent + ' 버튼');
          display.textContent = buttonContent; // 계산기의 화면에 나타날 텍스트를 버튼의 텍스트로 변경합니다.
          console.log(previousNum);
        }
      }
    }
    if (action === 'decimal') {
      // 1. '.'의 유무를 판단하기 위해 isDecimal을 선언하고 false 값을 할당한다.
      // 2. 만약 현재 입력된 값에 '.'이 있다면 isDecimal 값을 true로 할당한다.
      // 3. 만약 현재 입력된 값에 '.'이 없다면 '.'을 더한다.

      if (!isDecimal) { // if문은 참, 일때 실행되기 때문에, !로 조건을 반대로 설정한다.
        display.textContent += '.';
        isDecimal = true;
      }
    }
    if (action === 'clear') {
      // 1. 계산기에 입력되었던 첫 번째 값
      // 2. 연산자
      // 3. 계산기에 입력되었던 두 번째 값
      // 4. 화면
      // 5. 소수점의 유무

      firstNum = undefined;
      operator.textContent = undefined;
      previousNum = undefined;
      display.textContent = '0';
      isDecimal = false;
    }
    if (action === 'calculate') {
      // 처음에 previousNum 대신 display.TextContent를 사용해서 음수값이 나오지 않았다.
      // 두번째 값이 계속 고정 되어 있어야 함으로 세번째 매개변수는 previusNum을 넣어주었다.
      display.textContent = calculate(firstNum, operatorForAdvanced, previousNum);

      // 현재 결과값이 첫번째 값이 된다.
      firstNum = display.textContent;
      previousKey = 'calculate';
    }
  }

});
