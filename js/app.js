let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString(); // Преобразуем результат в строку для отображения на экране
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }
    const intbuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intbuffer;
    } else {
        flushOperation(intbuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intbuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += intbuffer;
            break;
        case '-':
            runningTotal -= intbuffer;
            break;
        case '*':
            runningTotal *= intbuffer;
            break;
        case '/':
            runningTotal /= intbuffer;
            break;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        const buttonText = event.target.innerText;
        buttonClick(buttonText);
    });
}
init();