const VALIDATOR = new RegExp('^\\s*[+-]?(\\d+|\\.\\d+|\\d+\\.\\d+|\\d+\\.)(e[+-]?\\d+)?\\s*$');

function resolveActiveRadioButton() {
    let activeRadioButton = undefined;
    document.getElementsByName('shape').forEach(value => {
        if (value.checked)
            activeRadioButton = value;
    });
    return activeRadioButton;
}

function resolveValName() {
    return (['circle', 'circleLength', 'sphereVolume'].includes(resolveActiveRadioButton().value)) ? 'Radius:' : 'Edge:';
}

function calculateCircleArea(radius) {
    return Math.PI * Math.pow(radius, 2);
}

function calculateSquareArea(edge) {
    return Math.pow(edge, 2);
}

function calculateTriangle(edge) {
    return Math.pow(edge, 2) * (Math.sqrt(3) / 4);
}

function calculateCircleLength(radius) {
    return 2 * Math.PI * radius;
}

function calculateSphereVolume(radius) {
    return (4 / 3) * Math.PI * Math.pow(radius, 3);
}

function validateField() {
    const input = document.getElementById('val').value;
    const errorField = document.getElementById('errorText');
    errorField.innerText = ''
    errorField.hidden = true;
    if (input === '') {
        errorField.innerText = 'Input cannot be empty!';
        errorField.hidden = false;
        return false;
    } else if (!VALIDATOR.test(input)) {
        errorField.innerText = 'Input must contain only numbers or special symbol!';
        errorField.hidden = false;
        return false;
    }
    return true;
}

function calculate() {
    if (validateField()) {
        const activeRadioButton = resolveActiveRadioButton();
        const val = parseFloat(document.getElementById('val').value);
        let result;
        switch (activeRadioButton.value) {
            case 'triangle':
                result = calculateTriangle(val);
                break;
            case 'square':
                result = calculateSquareArea(val);
                break;
            case 'circle':
                result = calculateCircleArea(val);
                break;
            case 'circleLength':
                result = calculateCircleLength(val);
                break;
            case 'sphereVolume':
                result = calculateSphereVolume(val);
                break;
        }
        document.getElementById('res').value = result;
    }
}

document.getElementsByName('shape').forEach(v =>
    v.addEventListener('change', ev => document.getElementById('val-label').innerText = resolveValName())
)

document.getElementById('calculateButton').addEventListener('click', calculate);