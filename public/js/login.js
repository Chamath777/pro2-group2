async function LoginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    
    if (response.ok) document.location.replace("/saveFile");
    else alert(response.statusText);
  }
}

function GoToSignUpHandler() {
  document.location.replace("/signUp");
}

document
  .querySelector(".login-btn")
  .addEventListener("click", LoginFormHandler);

document
  .querySelector(".signUp-page-btn")
  .addEventListener("click", GoToSignUpHandler);
