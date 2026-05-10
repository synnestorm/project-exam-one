const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const password = document.getElementById("password");
const result = document.getElementById("result");
const loginUrl = "https://v2.api.noroff.dev/auth/login";

const loader = document.createElement("div");
loader.className = "loader";
loader.id = "loader";
loader.style.display = "none";
document.body.appendChild(loader);

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  result.innerHTML = "";
  const enteredEmail = emailInput.value.trim();
  const enteredPassword = password.value.trim();
  const success = await loginUser(enteredEmail, enteredPassword);

  if (success) {
    result.innerHTML = "Login successful! Redirecting...";
    result.className = "success";

    setTimeout(function () {
      window.location.href = "../product/products.html";
    }, 1000);
  } else {
    result.innerHTML = "Invalid email or password.";
    result.className = "error";
  }
});

// async function to make API call for login user

async function loginUser(email, password) {
  loader.style.display = "flex";
  await new Promise((r) => setTimeout(r, 1000));
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    localStorage.setItem("authToken", data.data.accessToken);
    return true;
  } catch (error) {
    console.error("Failed to fetch authentication.", error);
    return false;
  } finally {
    loader.style.display = "none";
  }
}
