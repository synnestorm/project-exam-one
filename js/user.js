const registerForm = document.getElementById("registerForm")
const userName = document.getElementById("name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const emailError = document.getElementById("emailError")
const nameError = document.getElementById("nameError")
const passwordError = document.getElementById("passwordError")
const result = document.getElementById("result")

// function to Display Error
function showError(el, message) {
  el.innerHTML = message;
}

// function to Clear Error
function clearError(el) {
  el.innerHTML = "";
}

// function to validate username
function validateName() {
  let value = userName.value.trim();
  if (value.length < 5) {
    showError(nameError, "Username must be at least 5 characters.");
    return false;
  }
  clearError(nameError);
  return true;
}

// function to validate email
function validateEmail() {
  let value = email.value.trim();
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
    showError(emailError, "Please enter a valid email address.");
    return false;
  }
  clearError(emailError);
  return true;
}

// function to validate password
function validatePassword() {
  let value = password.value;
  if (value.length < 8) {
    showError(passwordError, "Password must be at least 8 characters.");
    return false;
  }
  clearError(passwordError);
  return true;
}

// function to validate form
function validateForm() {
  let okUsername = validateName();
  let okEmail = validateEmail();
  let okPassword = validatePassword();
  return okUsername && okEmail && okPassword;
}

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  result.innerHTML = "";

  if (validateForm()) {
    rememberUser()
    result.innerHTML = "Account created successfully! Redirecting...";
    result.className = "success";

    setTimeout(function () {
    window.location.href = "../account/login.html";
  }, 3000);
  } else {
    result.innerHTML = "Please correct the highlighted errors.";
    result.className = "error";
  }
});

// function to remember the registered user
function rememberUser() {
let registeredUser = {
    username: userName.value,
    email: email.value,
    password: password.value
}
    localStorage.setItem("registeredUser", JSON.stringify(registeredUser))
}