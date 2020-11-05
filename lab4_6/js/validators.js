const NAME_REGEXP = new RegExp('^(([A-Z])([a-z]+)?(\'?)([a-z]+))(([ -])([A-Za-z]+)?(\'?)([A-Za-z]+))*$')
const SPACE_REDUCE_REGEXP = new RegExp(' {2,}', 'g')
const EMAIL_REGEXP = new RegExp('^([A-Za-z])([A-Za-z._0-9]*)([A-Za-z0-9])(@)([a-z_0-9]+.){1,6}([a-z]{2,8})$')
const PASSWORD_REGEXP = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$')
const DATE_REGEXP = new RegExp('^(([0-2][0-9])|3[0-1])(\.|\/)((0[0-9])|(1[1-2]))(\.|\/)((20[0-1][0-9])|(19[2-9][0-9]))$')
const INTEREST_REGEXP = new RegExp('^\.{0,500}$')
const PROFILE_PIR_REGEXP = new RegExp('(\.gif|\.jpg|\.png)$')


const VALID = {
    'fname': false,
    'sname': false,
    'email': false,
    'birthdate': false,
    'password': false,
    'repeat-password': false,
    'interests': false,
    'profile-pic': false
}

const REGEXP_BY_ID = {
    'fname': NAME_REGEXP,
    'sname': NAME_REGEXP,
    'email': EMAIL_REGEXP,
    'birthdate': DATE_REGEXP,
    'password': PASSWORD_REGEXP,
    'interests': INTEREST_REGEXP,
    'profile-pic': PROFILE_PIR_REGEXP
}

function checkValidation() {
    return !Object.values(VALID).includes(false);
}

function hideAllErrors() {
    Array.from(document.querySelectorAll('.error')).forEach(el => el.style.display = 'none')
}

function setErrorVisibility(errorElementId, show) {
    document.getElementById(errorElementId+ '-error').style.display = (show) ? '' : 'none';
}

function trim(text) {
    return text.replaceAll(SPACE_REDUCE_REGEXP, ' ').trim();
}

function validate(event) {
    const el = event.target;
    console.log('validating... ');
    console.log(el);
    const text = trim(el.value);
    console.log('text = ' + text)
    let isValid = REGEXP_BY_ID[el.id].test(text);

    console.log('validated: ' + isValid);
    VALID[el.id] = isValid;
    setErrorVisibility(el.id, !isValid);
}

function checkIfPasswordMatch() {
    const repeatId = "repeat-password";
    const password = trim(document.getElementById('password').value);
    const repeatPassword = trim(document.getElementById(repeatId).value);

    const res = password === repeatPassword;
    VALID[repeatId] = res;
    setErrorVisibility(repeatId, !res);
}

function handleRegister() {
    if (!checkValidation()) {
        setErrorVisibility('register', true);
    } else {
        setErrorVisibility('register', false);
        alert('Registration completed!');
    }
}

document.addEventListener('DOMContentLoaded', hideAllErrors)

document.getElementsByClassName('register-button-login')[0].addEventListener('click', ev =>
    document.getElementById('login-window').style.display = '')

document.getElementById('cross-login-btn').addEventListener('click', ev =>
    document.getElementById('login-window').style.display = 'none')

document.querySelectorAll('.to-validate').forEach(el => el.addEventListener('change', ev => validate(ev)))
document.getElementById('repeat-password').addEventListener('change', checkIfPasswordMatch)

document.getElementById('register-button').addEventListener('click', handleRegister)