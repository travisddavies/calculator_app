let operators = [];
let operands = [];
let operandsBuilder = [];
let text = "";
let total = 0;
const operatorSymbols = ['+', '-', '*', '%', '/', '='];
const operatorSymbolsUnicode = ['&plus;', '&#8722;', '&#120;', '%', '&#247;', '='];
let resultShown = false;
let equalsPressed = false;

document.getElementById("result").innerHTML = total;

function backSpace() {
    let deletedEntry = operandsBuilder.pop();
    document.getElementById("result").innerHTML = (operandsBuilder.length === 0) ? 0 : getResultValue();
}

function clearEntry() {
    operandsBuilder = [];
    document.getElementById("result").innerHTML = 0;
}

function clearAll() {
    text = "";
    operators = [];
    operands = [];
    operandsBuilder = [];
    total = 0;
    document.getElementById("expression").innerHTML = text;
    document.getElementById("result").innerHTML = total;
}

function addValue(value, newtext) {
    if (equalsPressed && isOperator(value)) {
        resultShown = false;
        equalsPressed = false;
        text = "";
        addOperand(total);
        addOperator(value, newtext);
    }
    else if (equalsPressed) {
        clearAll();
        resultShown = false;
        equalsPressed = false;
        addOperand(value);
    } else if (resultShown) {
        resultShown = false;
        addOperand(value);
    } else if (isOperator(value)) {
        addOperator(value, newtext);
    } else {
        addOperand(value);
    } 

    document.getElementById("result").innerHTML = (operators.length === 2) ? performCalc() : getResultValue(value);

    if (operators.length > 0 || resultShown) {
        document.getElementById("expression").innerHTML = text;
    }
}

function getResultValue(value) {
    return (operandsBuilder.length > 0) ? operandsBuilder.join('') : operands[operands.length - 1];
}

function addOperand(value) {
    operandsBuilder.push(value);
}

function addOperator(value, newtext) {
    operators.push(value);
    num = Number.parseFloat(operandsBuilder.join(''));
    operandsBuilder = [];
    operands.push(num);
    text += num;
    text += " ";
    text += (newtext) ? newtext : String(value);
    text += " ";
}

function isOperator(value) {
    for (let operatorSymbol of operatorSymbols) {
        if (operatorSymbol === value) {
            return true;
        }
    }
    return false;
}

function performCalc() {
    let lastOperator = operators.pop();
    let num2 = operands.pop();
    let num1 = (operands.length > 0) ? operands.pop() : total;
    let operator = operators.pop();
    let calc = 0;

    switch (operator) {
        case '+':
            calc = num1 + num2;
            break;
        case '-':
            calc = num1 - num2;
            break;
        case '/':
            calc = num1 / num2;
            break;
        case '*':
            calc = num1 * num2;
            break;
        case '%':
            calc = num1 % num2;
            break;    
    }
    if (lastOperator !== '=') {
        operators.push(lastOperator);
        text = calc + " " + operatorSymbolsUnicode[operatorSymbols.indexOf(lastOperator)] + " ";
    } else equalsPressed = true;
    total = calc;
    resultShown = true;
    return calc;
}