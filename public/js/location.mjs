import { GetPlayerInformation, GetItemInformation, GetCurrentMerchant, GetSessionInformation } from "./getData.mjs";
import { UpdatePlayerCoins } from "./updateData.mjs";
import { TransferItem } from "./itemController.mjs";

async function BuyItemHandler(event) 
{
	event.preventDefault();

	if (event.target.hasAttribute("item-id")) 
	{
		const itemId = await event.target.getAttribute("item-id");
		const itemPrice = await event.target.getAttribute("item-price");
		const merchantData = await GetCurrentMerchant();
		const playerData = await GetPlayerInformation();
		const itemData = await GetItemInformation(itemId);
		
		if (playerData.coins >= itemPrice)
		{
			await TransferItem(itemData.itemTypeId, playerData.id, merchantData.id, 1);
			const newPlayerCoins = parseInt(playerData.coins) - parseInt(itemPrice);
			await UpdatePlayerCoins(newPlayerCoins, playerData.id);
			location.reload();
		}
		else console.log("You can't afford that!");
	}
}

async function SellItemHandler(event)
{
	event.preventDefault();

	if (event.target.hasAttribute("item-id"))
	{
		const itemId = await event.target.getAttribute("item-id");
		const itemPrice = await event.target.getAttribute("item-price");
		const merchant = await GetCurrentMerchant();
		const itemData = await GetItemInformation(itemId);
		const playerData = await GetPlayerInformation();

		await TransferItem(itemData.itemTypeId, merchant.id, playerData.id, 1);
		const newPlayerCoins = parseInt(playerData.coins) + parseInt(itemPrice);
		await UpdatePlayerCoins(newPlayerCoins, playerData.id);

		location.reload();
	}
}

async function BackToMapHandler()
{
	const sessionData = await GetSessionInformation();
	document.location.replace(`/worldMap/${sessionData.saveFileId}`);
};

function SetupBuyAndSellButtons()
{
	const buyButtons = document.querySelectorAll(".buy-item");
	const sellButtons = document.querySelectorAll(".sell-item");

	for (let i = 0; i < buyButtons.length; i++)
	{
		buyButtons[i].addEventListener("click", BuyItemHandler);
	}

	for (let i = 0; i < sellButtons.length; i++) 
	{
		sellButtons[i].addEventListener("click", SellItemHandler);
	}
}

document.querySelector(".world-map")
        .addEventListener("click", BackToMapHandler);

SetupBuyAndSellButtons();