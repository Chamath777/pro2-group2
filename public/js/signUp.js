async function SignupFormHandler(event) 
{
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (name && email && password) 
  {
    const response = await fetch("/api/user/", 
    {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) document.location.replace("/saveFile");
    else alert(response.statusText);
  }
}

function BackHandler()
{
  document.location.replace("/");
}

function SetupButtons() 
{
	const signupButton = document.querySelector("#signup-form-btn");
	if (signupButton) signupButton.addEventListener("click", SignupFormHandler);

  const backButton = document.querySelector("#back-btn");
	if (backButton) backButton.addEventListener("click", BackHandler);
}

SetupButtons();