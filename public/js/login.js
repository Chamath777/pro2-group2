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
    else InvalidDetailsHandler();
  }
}

function InvalidDetailsHandler()
{
	const invalidDetailsModal = document.querySelector("#invalid-details-modal");
	invalidDetailsModal.classList.toggle("is-active");
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

  const closeInvalidDetailsModal = document.querySelector("#invalid-details-modal-close");
	if (closeInvalidDetailsModal) closeInvalidDetailsModal.addEventListener("click", InvalidDetailsHandler);

  const modalBackground = document.querySelectorAll(".modal-background");
  for (let i = 0; i < modalBackground.length; i++) 
  {
    modalBackground[i].addEventListener("click", InvalidDetailsHandler);
  }
}

SetupButtons();