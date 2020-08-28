console.log("start the test");

const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
};

function inputDigit(digit){
    const {displayValue, waitingForSecondOperand} = calculator;
    if(waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    console.log(calculator);
}
function addDecimal(dot){
    if(calculator.waitingForSecondOperand === true){
        calculator.displayValue = "0.";
        calculator.waitingForSecondOperand = false;
        return;
    }
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}
function changeInteger(sign){
    let convertedNum = -Math.abs(sign);
    return "-" + convertedNum;
}
function basicOperator(selectedOperator){
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue);

    if(operator && calculator.waitingForSecondOperand){
        calculator.operator = selectedOperator;
        console.log(calculator);
        return;
    }
    if(firstOperand === null && !isNaN(inputValue)){
        calculator.firstOperand = inputValue;
    } else if(operator){
        const result = calculateResult(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = selectedOperator;
    console.log(calculator);
}


function emptyTheBox(){
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function updateTheDisplay(){
    const display = document.querySelector('#display');

    display.value = calculator.displayValue;
}

updateTheDisplay();

function calculateResult(firstOperand, secondOperand, operator){
    if(operator === '+'){
        return firstOperand + secondOperand;
    } else if(operator === '-'){
        return firstOperand - secondOperand;
    } else if(operator === '*') {
        return firstOperand * secondOperand;
    }else if(operator === '/'){
        return firstOperand/secondOperand;
    }else if(operator === '%'){
        return firstOperand % secondOperand;
    }
    return secondOperand;
}

const btns = document.querySelector('#keysContainer');
btns.addEventListener('click', (e) => {
    const {target} = e;
    if(!target.matches('button')){
        return;
    }
    if(target.classList.contains('opButton')){
        basicOperator(target.value);
        updateTheDisplay();
        return;
    }
    if(target.classList.contains('decimal')){
        addDecimal(target.value);
        updateTheDisplay();
        return;
    }
    if(target.classList.contains('negPos')){
        changeInteger(target.value);
        updateTheDisplay();
        return;
    }
    if(target.classList.contains('AllClear')){
        emptyTheBox();
        updateTheDisplay();
        return;
    }
    inputDigit(target.value);
    updateTheDisplay();
})

