const loginForm = document.getElementById("loginForm")
const emailInput = document.getElementById("email")
const password = document.getElementById("password")
const emailError = document.getElementById("emailError")
const nameError = document.getElementById("nameError")
const passwordError = document.getElementById("passwordError")
const result = document.getElementById("result")
const loginUrl = "https://v2.api.noroff.dev/auth/login";

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

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  result.innerHTML = "";
  const enteredEmail = emailInput.value.trim()
  const enteredPassword = password.value.trim()
  const success = await loginUser(enteredEmail, enteredPassword);
  

  if (success) {
    result.innerHTML = "Login successful! Redirecting...";
    result.className = "success";

    setTimeout(function () {
    window.location.href = "../product/products.html";
  }, 3000);

  } else {
    result.innerHTML = "Invalid email or password.";
    result.className = "error";
  }
});

// async function to make API call for login user

async function loginUser(email, password) {
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    if (!response.ok) {
      /* This is for debugging:
      const errorData = await response.json();
      console.error("API error:", JSON.stringify(errorData, null, 2));
      */
      return false;
    }
    const data = await response.json();
    localStorage.setItem("authToken", data.data.accessToken);
    // debugging: console.log("Login response:", data);
    return true;
  } catch (error) {
    console.error("Failed to fetch authentication.", error)
    return false;
  }
}