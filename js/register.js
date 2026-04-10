// variables fetched from DOM
const registerForm = document.getElementById("registerForm")
const userName = document.getElementById("name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const emailError = document.getElementById("emailError")
const nameError = document.getElementById("nameError")
const passwordError = document.getElementById("passwordError")
const result = document.getElementById("result")

const registerUrl = "https://v2.api.noroff.dev/auth/register";

// loader
const loader = document.createElement("div")
loader.className = "loader"
loader.id = "loader"
loader.style.display = "none"
document.body.appendChild(loader)

// function to display Error
function showError(el, message) {
  el.innerHTML = message;
}

// function to clear Error
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

registerForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  result.innerHTML = "";

  if (validateForm()) {
    const success = await registerUser()

    if(success) {
    result.innerHTML = "Account created successfully! Redirecting...";
    result.className = "success";

    setTimeout(function () {
    window.location.href = "../account/login.html";
  }, 1000);
    } else {
      result.innerHTML = "Registration failed. Please try again.";
      result.className = "error";
    }
    
  } else {
    result.innerHTML = "Please correct the highlighted errors.";
    result.className = "error";
  }
});

// async function to make API call for register user
async function registerUser() {
  loader.style.display = "flex"
  await new Promise(r => setTimeout(r, 1000))
  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: userName.value,
        email: email.value,
        password: password.value,
        bio: ""
      })
    });
    if (!response.ok) {
     /* debugging:
      const errorData = await response.json();
      console.error("API error:", JSON.stringify(errorData, null, 2));
    */
      return false;
    }
    const data = await response.json();
    return true;
  } catch (error) {
    console.error("Failed to fetch authentication.", error)
    return false;
  } finally {
    loader.style.display = "none"
  }
}