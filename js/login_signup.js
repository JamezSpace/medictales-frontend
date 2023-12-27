

function switch_to_login(e) {
    // close sign up page
    document.getElementById("sign-up-page").classList.remove("page-active");
    document.getElementById("sign-up-tab").classList.remove("btn-active");
    document.getElementsByClassName("container")[0].classList.remove("grid-layout")
    
    // open login page
    document.getElementById("login-page").classList.add("page-active");
    document.getElementById("login-tab").classList.add("btn-active");

    // change button to sign up
    document.getElementById("sign-up-tab").classList.add("btn-active");
    e.classList.remove("btn-active");
}

function switch_to_signup(e) {
    // close login page
    document.getElementById("login-page").classList.remove("page-active");
    document.getElementById("login-tab").classList.remove("btn-active");

    // open sign up page
    document.getElementsByClassName("container")[0].classList.add("grid-layout")
    document.getElementById("sign-up-page").classList.add("page-active");
    document.getElementById("sign-up-tab").classList.add("btn-active");

    // change button to login
    document.getElementById("login-tab").classList.add("btn-active");
    e.classList.remove("btn-active");
}

// slideshow functionality
const slides = document.querySelectorAll("section.slide");
let i = 0;

setInterval(() => {
    console.log(i);
    slides[i].classList.remove("active");
    if (i == slides.length - 1) i = -1;
    slides[i + 1].classList.add("active");
    i++;
}, 2000)

// validate inputs
function validate_name(name) {
    let obj = { valid: true, msg: null, field: null }
    const username = name.trim().toLowerCase()

    // checks for empty string
    if (username.length === 0) obj = { valid: false, msg: "Fill in your name", field: "error-name" }

    // checks for any digit
    else if (/\d/.test(username)) obj = { valid: false, msg: "Remove the digit in the name", field: "error-name" }

    // checks for any special character
    else if (!/^[a-zA-Z]+$/.test(username)) obj = { valid: false, msg: "Remove the symbol in the name", field: "error-name" }

    return obj
}

function validate_email(email) {
    let obj = { valid: true, msg: null, field: null }
    const useremail = email.trim().toLowerCase()
    const email_array = useremail.split('@')

    // ensures first part of email address is more than 2 characters
    if (email_array[0].length < 2) obj = { valid: false, msg: "Email is not valid", field: "error-email" };

    // ensures only gmail is accepted (@gmail.com)
    else if (email_array[1] !== "gmail.com") obj = { valid: false, msg: "Use a gmail account '@gmail.com'", field: "error-email" }

    return obj
}

function validate_member_or_writer() {
    let obj = { valid: true, msg: null, field: null }, checked_input;
    const inputs = document.querySelectorAll("div.memberField section.selectOne span.single-field input[type=\"radio\"]")

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) checked_input = inputs[i].id
    }

    if (typeof checked_input === 'undefined') obj = {
        valid: false,
        msg: "Select One!",
        field: "error-member"
    }

    console.log(obj);
    return obj;
}

// TODO
/**
 * Function validates password
 * @param {string} password 
 */
function validate_password(password) {
    let password_valid = true
    const userpassword = password.trim()

    // ensures password has at least 5 characters
    if (userpassword.length < 5) {
        password_valid = false
        const icon = document.getElementById("check-length").children[0];

        if (icon.classList.contains("valid")) icon.classList.replace("valid", "invalid")
        else if (!icon.classList.contains("invalid")) icon.classList.add("invalid")
    } else document.getElementById("check-length").children[0].classList.replace("invalid", "valid")

    // ensures password combines letters and numbers
    if (!(/\d/.test(userpassword) && /[a-zA-Z]/.test(userpassword))) {
        password_valid = false
        const icon = document.getElementById("check-alnumeric").children[0];

        if (icon.classList.contains("valid")) icon.classList.replace("valid", "invalid")
        else if (!icon.classList.contains("invalid")) icon.classList.add("invalid")
    } else document.getElementById("check-alnumeric").children[0].classList.replace("invalid", "valid")

    return password_valid;
}


/**
 * Function writes error messages in an error bar but both the message and the 'id' of the field to write the message is passed as arguments.
 * @param {string} message 
 * @param {string} field_to_write_error_message 
 */
function write_error_message(message, field_to_write_error_message) {
    const error_bars = document.querySelectorAll("div.error-bar");

    for (let i = 0; i < error_bars.length; i++) {
        const each_error_bar = error_bars[i];
        console.log(field_to_write_error_message, each_error_bar.id);

        if (field_to_write_error_message === each_error_bar.id) {
            // the childNode at index 1 is the span element displaying the message
            each_error_bar.children[1].textContent = message;
            each_error_bar.classList.add("make-visible")
        }
    }
}


/**
 * To default inputs is simply to remove the error bars, hence, code finds all error bars that are visible and makes invisble.
 */
function remove_error_bars() {
    const error_bars = document.querySelectorAll("div.error-bar");

    for (let i = 0; i < error_bars.length; i++) {
        const each_error_bar = error_bars[i];

        each_error_bar.classList.remove("make-visible")
    }
}

function validate_all_inputs(form) {
    let all_valid = true;

    const email_validation_result = validate_email(document.getElementById("email-signup").value || document.getElementById("email-login").value);

    let input_array = [email_validation_result]

    if (form === 'sign-up') {
        const name_validation_result = validate_name(document.getElementById("name").value);
        const member_field_result = validate_member_or_writer()

        input_array.push(name_validation_result, member_field_result)

        if (!validate_password(document.getElementById("password-signup").value)) all_valid = false
    }

    remove_error_bars()
    console.log(input_array);

    for (let i = 0; i < input_array.length; i++) {
        const each_input = input_array[i];

        if (!each_input.valid) {
            all_valid = false;

            write_error_message(each_input.msg, each_input.field);
            break;
        }
    }

    return all_valid;
}

document.getElementById("sign-up-form").addEventListener("submit", e => {
    console.log(e);
    if (!validate_all_inputs("sign-up")) e.preventDefault()
})


// document.getElementById("submit-btn").addEventListener("click", e => {
//     console.log(e);
//     if (!validate_all_inputs()) e.preventDefault()
// })

document.getElementById("login-form").addEventListener("submit", e => {
    console.log(e);
    if (!validate_all_inputs("login")) e.preventDefault()
})