let isSelectingSecondNumber = false;
let firstNumbers = []
let secondNumbers = []
let operator = undefined;


function toNumber(array) {
    return parseFloat(array.reduce((x1, x2) => x1 + x2));
}

function toArray(number) {
    return number.toString().split('');
}

function updateResult() {
    document.getElementById('result').textContent = (firstNumbers.length < 1)
        ? '0'
        : ((isSelectingSecondNumber && secondNumbers.length > 0)
            ? toNumber(secondNumbers)
            : toNumber(firstNumbers));
}

function handleNumberClick(ev) {
    const clickedNumber = ev.toElement.textContent;
    console.log(clickedNumber);

    if (!isSelectingSecondNumber) {
        firstNumbers.push(clickedNumber);
    } else {
        secondNumbers.push(clickedNumber);
    }
    updateResult();
}

function handleOperatorClick(ev) {
    const clickedOperator = ev.toElement.textContent.toLowerCase();
    console.log(clickedOperator);

    switch (clickedOperator) {
        case '+': case '-': case '*': case '/': case '^': {
            secondNumbers = [];
            isSelectingSecondNumber = true;
            operator = clickedOperator;
            break;
        }
        case '=': {
            console.log('f ' + firstNumbers)
            console.log('s ' + secondNumbers)
            console.log('o ' + operator)

            if (isSelectingSecondNumber && secondNumbers.length > 0) {
                let result = toNumber(firstNumbers);
                switch (operator) {
                    case '+': {
                        result += toNumber(secondNumbers);
                        break;
                    } case '-': {
                        result -= toNumber(secondNumbers);
                        break;
                    } case '*': {
                        result *= toNumber(secondNumbers);
                        break;
                    } case '/': {
                        result /= toNumber(secondNumbers);
                        break;
                    } case '^': {
                        result = Math.pow(result, toNumber(secondNumbers));
                        break;
                    }
                }
                document.getElementById('result').textContent = result.toString();
                firstNumbers = toArray(result);
            }
            return;
        }
        case 'c': {
            secondNumbers = [];
            firstNumbers = [];
            isSelectingSecondNumber = false;
            break;
        }
        case '<': {
            if (isSelectingSecondNumber) {
                secondNumbers.pop();
            } else {
                firstNumbers.pop();
            }
            break;
        }
        case '+/-': {
            if (isSelectingSecondNumber) {
                if (secondNumbers[0] !== '-')
                    firstNumbers.unshift('-')
                else delete secondNumbers[0];
            } else {
                if (firstNumbers[0] !== '-')
                    firstNumbers.unshift('-')
                else delete firstNumbers[0];
            }
            break;
        }
        default: {
            console.warn('received unsupported operator: ' + clickedOperator)
        }
    }
    updateResult();
}


Array.from(document.getElementsByClassName('number')).forEach(el => el.addEventListener('click', handleNumberClick))
Array.from(document.getElementsByClassName('operator')).forEach(el => el.addEventListener('click', handleOperatorClick))

