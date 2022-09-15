async function GetCityHandler(event)
{
	if (event.target.hasAttribute("data-id")) 
	{
		const locationId = event.target.getAttribute("data-id");
		const response = await fetch(`/api/location/${locationId}`, { method: "GET", });

		if (response.ok) document.location.replace(`/location/${locationId}`);
		else alert(response.statusText);
	}
};

function SetupLocationButtons()
{
	const locationButtons = document.querySelectorAll(".cities");
	for (let i = 0; i < locationButtons.length; i++)
	{
		locationButtons[i].addEventListener("click", GetCityHandler);
	}
}

SetupLocationButtons();