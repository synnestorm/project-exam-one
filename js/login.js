const loginForm = document.getElementById("loginForm")
const emailInput = document.getElementById("email")
const password = document.getElementById("password")
const emailError = document.getElementById("emailError")
const nameError = document.getElementById("nameError")
const passwordError = document.getElementById("passwordError")
const result = document.getElementById("result")
let user = JSON.parse(localStorage.getItem("registeredUser"))

function showError(el, message) {
  el.innerHTML = message;
}

function clearError(el) {
  el.innerHTML = "";
}

function validateEmail(enteredEmail) {
if (!user) {
showError(emailError, "No user found.");
return false;
}
  if (enteredEmail !== user.email) {
    showError(emailError, "Incorrect Email.");
    return false;
  }
  clearError(emailError);
  return true;
}

function validatePassword(enteredPassword) {
  if (enteredPassword !== user.password) {
    showError(passwordError, "Incorrect password.");
    return false;
  }
  clearError(passwordError);
  return true;
}

function validateForm(enteredEmail, enteredPassword) {
  let okEmail = validateEmail(enteredEmail);
  let okPassword = validatePassword(enteredPassword);
  return okEmail && okPassword;
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let enteredEmail = emailInput.value.trim()
  let enteredPassword = password.value.trim()
  result.innerHTML = "";

  if (validateForm(enteredEmail, enteredPassword)) {
    result.innerHTML = "Login successful! Redirecting...";
    result.className = "success";

    let randomToken = function() {
    return Math.random().toString(36).substring(2); 
    }
    let token = randomToken() + randomToken();
    localStorage.setItem("authToken", token); 

    setTimeout(function () {
    window.location.href = "../product/products.html";
  }, 3000);

  } else {
    result.innerHTML = "Invalid email or password.";
    result.className = "error";
  }
});