const form = document.getElementById('form1');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const number = document.getElementById('Number');
const email = document.getElementById("email");
const password = document.getElementById('pass');
const container = document.getElementById('form');
const basic = document.getElementById('basic')
const head = document.getElementById("header h2")
const address = document.getElementById("Address");
const age = document.getElementById("age");
const button = document.getElementById("btn")
var valid = true;

// Add event
form.addEventListener('submit', (prevent) => {
    prevent.preventDefault(); // Prevent form from submitting
    valid = true; // Reset valid flag to true before validation
    validate(); // Call validate function

    if (valid) {
        form.submit(); // Submit form only if validation is true
    }
});

// Email validation function
const isEmail = (emailval) => {
    var atSymbol = emailval.indexOf("@");
    if (atSymbol < 1) return false;
    var dot = emailval.lastIndexOf(".");
    if (dot <= atSymbol + 3) return false;
    if (dot === emailval.length - 1) return false;
    return true;
}

// Password validation function
function validatePassword(passwordval) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (regex.test(passwordval)) {
        return true;
    }
    return false;
}

// Validation function
const validate = () => {
    const fnameval = fname.value.trim();
    const lnameval = lname.value.trim();
    const numberval = number.value.trim();
    const emailval = email.value.trim();
    const passwordval = password.value.trim();
    const ageval = age.value.trim();

    // Validate first name
    if (fnameval === "") {
        seterror(fname, 'First name cannot be blank');
    } else if (fnameval.length <= 2) {
        seterror(fname, 'First name should contain at least 3 letters');
    } else {
        success(fname);
    }

    // Validate last name
    if (lnameval === "") {
        seterror(lname, 'Last name cannot be blank');
    } else if (lnameval.length <= 2) {
        seterror(lname, 'Last name should contain at least 3 letters');
    } else {
        success(lname);
    }

    // Validate email
    if (emailval === "") {
        seterror(email, 'Email cannot be blank');
    } else if (!isEmail(emailval)) {
        seterror(email, 'Not a valid email');
    } else {
        success(email);
    }

    // Validate age
    if (ageval === "") {
        seterror(age, "Invalid age");
    } else if (ageval < 18 || ageval > 80) {
        seterror(age, "Age should be between 18 and 80");
    } else {
        success(age);
    }

    // Validate phone number
    if (numberval === "") {
        seterror(number, 'Phone number cannot be blank');
    } else if (numberval.length <= 9) {
        seterror(number, 'Phone number should not be less than 10 digits');
    } else {
        success(number);
    }

    // Validate password
    if (passwordval === "") {
        seterror(password, 'Password cannot be blank');
    } else if (!validatePassword(passwordval)) {
        seterror(password, "Password must contain at least one uppercase, one lowercase, one digit, one special character, and at least 8 characters");
    } else {
        success(password);
    }
}

// Error display function
function seterror(input, error) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-control error";
    small.innerText = error;
    valid = false; // Set valid flag to false when error occurs
}

// Success display function
function success(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-control success";
}
