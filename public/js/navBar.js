function GoToHomePageHandler() 
{
  document.location.replace("/saveFile");
}

async function LogOutHandler() 
{
	const response = await fetch('/api/user/logout', 
	{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) document.location.replace('/');
	else alert(response.statusText);
};

function HowToPlayModalHandler()
{
	const howToPlayModal = document.querySelector("#how-to-play-modal");
	howToPlayModal.classList.toggle("is-active");
}

async function CloseHowToPlayModalHandler()
{
	const viewScoreModal = document.querySelector("#how-to-play-modal");
	viewScoreModal.classList.remove("is-active");
}

function SetupButtons() 
{
	const homePageButton = document.querySelector("#homepage");
	if (homePageButton) homePageButton.addEventListener("click", GoToHomePageHandler);

	const logOutButton = document.querySelector("#logout");
	if (logOutButton) logOutButton.addEventListener("click", LogOutHandler);

	const howToPlayButton = document.querySelector("#how-to-play");
	if (howToPlayButton) howToPlayButton.addEventListener("click", HowToPlayModalHandler);

	const howToPlayModalCloseButton = document.querySelector("#how-to-play-modal-close");
	if (howToPlayModalCloseButton) howToPlayModalCloseButton.addEventListener("click", HowToPlayModalHandler);

	const modalBackground = document.querySelectorAll(".modal-background");
	for (let i = 0; i < modalBackground.length; i++) 
	{
		modalBackground[i].addEventListener("click", CloseHowToPlayModalHandler);
	}
}

//this is to make the navbar burger button clickable
document.addEventListener("DOMContentLoaded", () => 
{
	// Get  "navbar-burger" elements
	const navbarBurger = document.querySelector(".navbar-burger");
	const navBarMenu = document.querySelector(".navbar-menu");

	// Add a click event on each of them
	navbarBurger.addEventListener("click", () => 
	{
		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		navbarBurger.classList.toggle("is-active");
		navBarMenu.classList.toggle("is-active");
	});
});

SetupButtons();