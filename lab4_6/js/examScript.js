const CORRECT_ANSWERS = ['C', 'B', 'C', 'B', 'C', 'B', 'B', 'B', 'C', 'B'];

function validateAllAnswersPresent() {
    let questions = document.getElementsByClassName('q');
    let isValid = true;
    console.log(questions);
    Array.from(questions).forEach(q => {
        let isAtLeastOneChildChecked = false;
        Array.from(q.children).forEach(ch => {
            if (ch.checked)
                isAtLeastOneChildChecked = true;
        });
        if (!isAtLeastOneChildChecked)
            isValid = false;
    });
    console.log(isValid)
    return isValid;
}

function resolveAnswerWithIndex(answer) {
    return [parseInt(answer.name.replace('q', '')), answer.value];
}

function isCheckedRadioButton(ch) {
    return ['a', 'b', 'c'].includes(ch.value) && ch.checked;
}

function resolveQuestions() {
    return Array.from(document.getElementsByClassName('q'));
}

function showFailures(failures) {
    let questionElements = Array.from(document.querySelectorAll('fieldset.q'));
    questionElements.forEach(el => el.style.backgroundColor = '#ededed');

    for (let i = 0; i < questionElements.length; i++) {
        if (failures.includes(i+1))
                questionElements[i].style.backgroundColor = '#ff4d4d';
    }
}

function sendResult(resultField, correctAnswers) {
    resultField.innerText = 'Correct answers: ' + correctAnswers;
    resultField.hidden = false;

    const relativeScore = correctAnswers / CORRECT_ANSWERS.length;
    if (relativeScore <= 0.2) {
        resultField.style.backgroundColor = 'red';
    } else if (relativeScore >= 0.8) {
        resultField.style.backgroundColor = 'green';
    } else {
        resultField.style.backgroundColor = 'darkorange';
    }
}

function resolveResult() {
    let errorField = document.getElementById('errorText');
    let resultField = document.getElementById('correctAnswers');
    errorField.hidden = true;
    resultField.hidden = true;
    resultField.innerText = '';
    errorField.innerText = '';

    if (validateAllAnswersPresent()) {
        let correctAnswers = 0;
        let answers = [], failures = [];
        resolveQuestions()
            .map(q => Array.from(q.children))
            .forEach(chCollection =>
                chCollection
                    .filter(ch => isCheckedRadioButton(ch))
                    .map(answer => resolveAnswerWithIndex(answer))
                    .forEach(c => answers.push(c)));
        console.log(answers);

        for (let i = 0; i < answers.length; i++) {
            if (answers[i][1].toUpperCase() === CORRECT_ANSWERS[i])
                correctAnswers++;
            else
                failures.push(i+1);
        }
        console.log('failures: ' + failures)
        showFailures(failures);
        sendResult(resultField, correctAnswers);
    } else {
        errorField.innerText = 'Select all answers!';
        errorField.hidden = false;
    }
}

document.getElementById('finishButton').addEventListener('click', resolveResult);