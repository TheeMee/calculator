const calculator = document.querySelector('.calculator-container');

const numberBtn = document.querySelectorAll('.number');
const operBtn = document.querySelectorAll('.oprator');

const display = document.querySelector('.display-container');

let num1 = 0;
let num2 = null;
let operator;
let asgDecimal = false;

let test = 'going on';

let asgValue = 'num1';

let calResult = function() {
    switch (operator) {
        case ('+'): return num1 + num2;
        case ('-'): return num1 - num2;
        case ('*'): return num1 * num2;
        case ('/'): return num1 / num2;
    }
}

let assignValue = function(value) {
    if (asgValue === 'num1') {
        if (asgDecimal) {
            let numStr = String(num1).split('.')
            let decimalPlaces = numStr[1]? numStr[1]: '';
            let integerPlaces = numStr[0];

            let placesLength = decimalPlaces.length
            let digit = placesLength + 1;
            decimalPlaces = decimalPlaces + String(value);
            decimalPlaces = '0.' + decimalPlaces;
            num1 = Number(integerPlaces) + Number(decimalPlaces);          
        } else num1 = (num1 * 10) +value;
    } else if (asgValue === 'num2') {
        if (asgDecimal) {
            let numStr = String(num2).split('.')
            let decimalPlaces = numStr[1]? numStr[1]: '';
            let integerPlaces = numStr[0];

            let placesLength = decimalPlaces.length
            let digit = placesLength + 1;
            decimalPlaces = decimalPlaces + String(value);
            decimalPlaces = '0.' + decimalPlaces;
            num2 = Number(integerPlaces) + Number(decimalPlaces);          
        } else if (num2 === null) {
            num2 = value;
        } else num2 = (num2 * 10) + value;
        }
    }


let assignOperator = function(operValue) { 

    asgDecimal = false;

    if (operator === '=' && !num1) {
        return; 
    } else if (num1 && num2 === null) {
        operator = operValue;
        asgValue = 'num2';        
    } else if (num1 && !(num2 === null)) {
        num1 = calResult();
        operator = operValue;
        num2 = null;
        asgValue = (operator === '=')? 'num1' : 'num2';        
    }
}

let nullify = function() {
    num1 = 0;
    num2 = null;
    operator = 0;
    asgValue = 'num1'
    asgDecimal = false;
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


let truncate = function(num) {
    decimals = num % 1;
    integers = num - decimals;
    if (String(decimals).length <= 5) {
        return num;
    } else {
        decimals = decimals.toFixed(5);
        num = integers + Number(decimals);
        return num;
    }
}

calculator.addEventListener('click', (event) => {
    let target = event.target;
    let targetClass = event.target.className;

    if (asgValue === 'num1' && String(num1).includes('.')) {
        asgDecimal = true;
    } else if (asgValue === 'num2' && String(num2).includes('.')) {
        asgDecimal = true;
    }
    
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
    } else if (target.id === '.') {
        asgDecimal = true;
    }

    num1 = truncate(num1);
    num2 = truncate(num2);

    let updateDisplay = new CustomEvent('updateDisplay')
    
    display.dispatchEvent(updateDisplay)


})

display.addEventListener('updateDisplay', () => {

    if (num1 === Infinity || num2 === Infinity) {
        nullify();
        display.textContent = 'You cannot do that!';
    } else if (asgValue === 'num1') {
        if (asgDecimal) {
            if (!String(num1).includes('.')) {
                display.textContent = num1 + '.';
            } else display.textContent = num1;
        } else display.textContent = num1;
    } else if (asgValue === 'num2') {
        if (asgDecimal) {
            if (!String(num2).includes('.')) {
                display.textContent = num2 + '.';
            } else display.textContent = num2;
        } else if (num2 === null) {
            display.textContent = num1;
        } else display.textContent = num2;
    } else if (asgValue === 'operator') {
        display.textContent = num1;
    } else {
        display.textContent = '';
    }
})


//this is the main branch