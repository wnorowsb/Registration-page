var loginInput = document.getElementById("login");
loginInput.addEventListener("keyup", checkLogin);
loginInput.addEventListener("keyup", checkErrors);

var firstnameInput = document.getElementById("firstname");
firstnameInput.addEventListener("keyup", checkFirstname);
firstnameInput.addEventListener("keyup", checkErrors);

var lastnameInput = document.getElementById("lastname");
lastnameInput.addEventListener("keyup", checkLastname);
lastnameInput.addEventListener("keyup", checkErrors);

var passwordConfirmInput = document.getElementById("password-confirm");
passwordConfirmInput.addEventListener("keyup", checkPasswordConfirm);
passwordConfirmInput.addEventListener("keyup", checkErrors);

var passwordInput = document.getElementById("password");
passwordInput.addEventListener("keyup", checkPassword);
passwordInput.addEventListener("keyup", checkErrors);
passwordInput.addEventListener("keyup", checkPasswordConfirm);

var photoInput = document.getElementById("photo");
photoInput.addEventListener("change", checkPhoto);
photoInput.addEventListener("change", checkErrors);

var birthdateInput = document.getElementById("birthdate");
birthdateInput.addEventListener("keyup", checkBirthdate);
birthdateInput.addEventListener("keyup", checkErrors);

var peselInput = document.getElementById("pesel");
peselInput.addEventListener("keyup", checkPesel);
peselInput.addEventListener("keyup", checkErrors);

checkLastname()
checkFirstname()
checkLogin()
checkPassword()
checkPasswordConfirm()
checkPesel()
checkPhoto()
checkSex()
checkBirthdate()


function checkLogin() {
    let cond = true;
    var loginErr = document.getElementById('login-err');
    if (typeof(loginErr) != 'undefined' & loginErr != null) {
        loginErr.parentNode.removeChild(loginErr);
    }
    let login = getV('login')
    if (login.length > 12 | login.length < 3) { cond = false }
    for (var i = 0; i < login.length; i++) {
        if (login[i] < 'a' | login[i] > 'z') { cond = false }
    }
    if (!cond) {
        printError('login-label', 'login-err', ' Login has to be 3-12 lowercase letters!');
        document.getElementById('submit').setAttribute('disabled', 'disabled');
    } else {
        var request = new XMLHttpRequest();
        request.open("GET", 'http://pi.iem.pw.edu.pl:5000/user/' + getV('login'))
        request.onload = function() {
            if (request.status == 200) {
                printError('login-label', 'login-err', ' This username is taken!');
                document.getElementById('submit').setAttribute('disabled', 'disabled');
            }
            if (request.status > 500) {
                printError('login-label', 'login-err', ' There was a problem while checking usename availability');
                document.getElementById('submit').setAttribute('disabled', 'disabled');
            }
        }
        request.send();
    };

}


function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

function checkErrors() {
    var errors = document.getElementsByClassName("error");
    if (errors.length == 0 | errors == null | typeof(errors) == 'undefined') {
        document.getElementById('submit').disabled = false;
    }
}

function printError(targetId, errorId, errorText) {
    let target = document.getElementById(targetId);
    let error = document.createElement("span");
    error.setAttribute("id", errorId);
    error.setAttribute("class", "error");
    error.innerHTML = errorText;
    insertAfter(error, target);
}

function getV(object) {
    return document.register[object].value;
}


function checkFirstname() {
    let err = document.getElementById('firstname-err')
    if (!getV('firstname').match(/[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]\w*/)) {
        if (typeof(err) == 'undefined' | err == null) {
            printError('firstname-label', 'firstname-err', ' Firstname must begin with capital, followed by lowercase letter (including Polish characters)!');
        }
        document.getElementById('submit').setAttribute('disabled', 'disabled');
    } else if (typeof(err) != 'undefined' & err != null) {
        err.parentNode.removeChild(err)
    }

}

function checkLastname() {
    let err = document.getElementById('lastname-err')
    if (!getV('lastname').match(/[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]\w*/)) {
        if (typeof(err) == 'undefined' | err == null) {
            printError('lastname-label', 'lastname-err', ' Lastname must begin with capital, followed by lowercase letter (including Polish characters)!');
        }
        document.getElementById('submit').setAttribute('disabled', 'disabled');
    } else if (typeof(err) != 'undefined' & err != null) {
        err.parentNode.removeChild(err)
    }
}

function checkPasswordConfirm() {
    let err = document.getElementById('password-conf-err')
    if (getV('password-confirm') !== getV('password')) {
        if (typeof(err) == 'undefined' | err == null) {
            printError('password-conf-label', 'password-conf-err', ' Passwords are different!');
        }
        document.getElementById('submit').setAttribute('disabled', 'disabled');
    } else if (typeof(err) != 'undefined' & err != null) {
        err.parentNode.removeChild(err)
    }
}

function checkPassword() {
    let err = document.getElementById('password-err')
    let password = getV('password')
    let correct = true
    if (password.length < 8) { correct = false }
    for (var i = 0; i < password.length; i++) {
        if (password[i] < 'A' | password[i] > 'z') { correct = false }
    }
    if (!correct) {
        if (typeof(err) == 'undefined' | err == null) {
            printError('password-label', 'password-err', ' Password has to be at least 8 [a-zA-Z] characters');
        }
        document.getElementById('submit').setAttribute('disabled', 'disabled');
    } else if (typeof(err) != 'undefined' & err != null) {
        err.parentNode.removeChild(err)
    }
}

function checkPhoto() {
    let err = document.getElementById('photo-err')
    if (getV('photo') == "") {
        if (typeof(err) == 'undefined' | err == null) {
            printError('photo-label', 'photo-err', ' You have to upload an avatar!');
        }
        document.getElementById('submit').setAttribute('disabled', 'disabled');
    } else if (typeof(err) != 'undefined' & err != null) {
        err.parentNode.removeChild(err)
    }
}

function checkSex() {
    let err = document.getElementById('sex-err')
    if (getV('sex') == "") {
        if (typeof(err) == 'undefined' | err == null) {
            printError('sex-label', 'sex-err', ' You have to choose your gender!');
        }
        document.getElementById('submit').setAttribute('disabled', 'disabled');
    } else if (typeof(err) != 'undefined' & err != null) {
        err.parentNode.removeChild(err)
    }
}

function checkPesel() {
    let err = document.getElementById('pesel-err')
    if (!getV('pesel').match(/\d{11}/i) | getV('pesel').length!=11 | !isValidPesel(getV('pesel'))) {
        if (typeof(err) == 'undefined' | err == null) {
            printError('pesel-label', 'pesel-err', ' Pesel must have 11 digits!');
        }
        document.getElementById('submit').setAttribute('disabled', 'disabled');
    } else if (typeof(err) != 'undefined' & err != null) {
        err.parentNode.removeChild(err)
    }
}

function checkBirthdate() {
    let err = document.getElementById('birthdate-err')
    if (!getV('birthdate').match(/((19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) {
        if (typeof(err) == 'undefined' | err == null) {
            printError('birthdate-label', 'birthdate-err', ' Birthdate has to be in format YYYY-MM-DD!');
        }
        document.getElementById('submit').setAttribute('disabled', 'disabled');
    } else if (typeof(err) != 'undefined' & err != null) {
        err.parentNode.removeChild(err)
    }
}

function calculatePasswordStrength() {
    let password = document.register.password.value
    if (!password)
        return 0;
    let pool = 0;
    if (password.match(/.*[a-z].*/))
        pool += 26;
    if (password.match(/.*[A-Z].*/))
        pool += 26;
    return password.length * Math.log2(pool)
}

function isValidPesel(pesel) {
    let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    let controlNumber = parseInt(pesel.substring(10, 11));
    for (let i = 0; i < weight.length; i++) {
        sum += (parseInt(pesel.substring(i, i + 1)) * weight[i]);
    }
    sum = sum % 10;
    return 10 - sum === controlNumber;
}