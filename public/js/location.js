const { GetPlayerInformation, TransferItem, GetCurrentMerchant } = require("./itemController");

async function BuyItemHandler(event) 
{
	event.preventDefault();

	if (event.target.hasAttribute("item-id")) 
	{
		const itemId = event.target.getAttribute("item-id");
		const playerData = GetPlayerInformation();
		const itemData = GetItemInformation(itemId);

		if (playerData.coins >= itemId.price) TransferItem(itemData, playerData.id, true);
		else console.log("You can't afford that!");
	}
}

async function SellItemHandler(event)
{
	event.preventDefault();

	if (event.target.hasAttribute("item-id"))
	{
		const itemId = event.target.getAttribute("item-id");
		const itemData = GetItemInformation(itemId);

		TransferItem(itemData, GetCurrentMerchant().id, false);
	}
}

async function BackToMapHandler(event)
{
  	await fetch(`/worldMap`, { method: "GET", });
};

document.querySelector(".world-map")
        .addEventListener("click", BackToMapHandler);

document.querySelector(".buy-item")
        .addEventListener("click", BuyItemHandler);

document.querySelector(".sell-item")
        .addEventListener("click", SellItemHandler);
