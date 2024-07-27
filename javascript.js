const calculator = document.querySelector('.calculator-container');

const numberBtn = document.querySelectorAll('.number');
const operBtn = document.querySelectorAll('.oprator');

const display = document.querySelector('.display-container');

let num1;
let num2;
let operator;

let asgValue = 'num1';

let calResult = function() {
    switch (operator) {
        case ('+'): return num1 + num2;
        case ('-'): return num1 - num2;
        case ('*'): return num1 * num2;
        case ('/'): return num1 / num2;
    }
}

let assignNum = function (num, value) {
    if (!num) {
        num = value;
    } else {
        num = (num * 10) + value;
    }
}

let assignValue = function(value) {
    if (asgValue === 'num1') {
        if (!num1) {
            num1 = value
        } else {
            num1 = (num1 * 10) + value;
        }
    } else if (asgValue === 'num2') {
        if (!num2) {
            num2 = value;
        } else {
            num2 = (num2 * 10) + value;
        }
    }
}

let assignOperator = function(operValue) {
    if (operator === '=' && !num1) {
        return; 
    }
    if (num1 && !num2) {
        operator = operValue;
        asgValue = 'num2';
    } else if (num1 && num2) {
        num1 = calResult();
        console.log(num1);
        asgValue = 'num1';
    }
}

let nullify = function() {
    num1 = null;
    num2 = null;
    operator = null;
    asgValue = 'num1'
}
let changeSign = function() {
    if (asgValue === 'num1' && num1) {
        num1 *= -1;
    } else if (asgValue === 'num2' && num2) {
        num2 *= -1;
    }
}

let addPercent = function() {
    if (asgValue === 'num1' && num1) {
        num1 /= 100;
    } else if (asgValue === 'num2' && num2) {
        num2 /= 100;
    }
}

calculator.addEventListener('click', (event) => {
    let target = event.target;
    let targetClass = event.target.className;

    if (targetClass === 'number') {
        let num = Number(target.id);
        assignValue(num);
    } else if (targetClass === 'operator') {
        let operValue  = target.id;
        assignOperator(operValue);
    } else if (target.id === 'AC') {
        nullify();     
    } else if (target.id === 'sign') {
        changeSign();
    } else if (target.id === 'percent') {
        addPercent();
    }

    let updateDisplay = new CustomEvent('updateDisplay')
    
    display.dispatchEvent(updateDisplay)
})

display.addEventListener('updateDisplay', () => {
    if (num1 && asgValue === 'num1') {
        display.textContent = num1;
    } else if (num2 && asgValue === 'num2') {
        display.textContent = num2
    } else {
        display.textContent = '';
    }
})

//test