async function LoginFormHandler(event) 
{
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) 
  {
    const response = await fetch("/api/user/login", 
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    
    if (response.ok) document.location.replace("/saveFile");
    else alert("Wrong email or password, please try again.");
  }
}

function GoToSignUpHandler() 
{
  document.location.replace("/signUp");
}

function SetupButtons() 
{
	const loginButton = document.querySelector("#login-btn");
	if (loginButton) loginButton.addEventListener("click", LoginFormHandler);

	const signupButton = document.querySelector("#signUp-page-btn");
	if (signupButton) signupButton.addEventListener("click", GoToSignUpHandler);
}

SetupButtons();