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

document.querySelector(".cities")
        .addEventListener("click", GetCityHandler);
