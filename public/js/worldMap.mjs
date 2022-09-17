import { UpdatePlayerLocation } from "./updateData.mjs";
import { GetPlayerInformation } from "./getData.mjs";
import { NewDay } from "./timeController.mjs";

async function GetLocationHandler(event)
{
	if (event.target.hasAttribute("data-id")) 
	{
		const locationId = event.target.getAttribute("data-id");
		const locationExistsResponse = await fetch(`/api/location/${locationId}`, { method: "GET", });

		if (locationExistsResponse.ok)
		{
			const playerData = await GetPlayerInformation();
			if (playerData.locationId != locationId)
			{
				await UpdatePlayerLocation(locationId, playerData.id);
				await NewDay();
			}

			document.location.replace(`/location/${locationId}`);
		} 
		else alert(locationExistsResponse.statusText);
	}
}

function SetupLocationButtons()
{
	const locationButtons = document.querySelectorAll(".cities");
	for (let i = 0; i < locationButtons.length; i++)
	{
		locationButtons[i].addEventListener("click", GetLocationHandler);
	}
}

SetupLocationButtons();