const { GetPlayerInformation, TransferItem, GetCurrentMerchant } = require("./itemController");

async function BuyItemHandler(event) 
{
	event.preventDefault();

	if (event.target.hasAttribute("item-id")) 
	{
		const itemId = event.target.getAttribute("item-id");
		const playerId = GetPlayerInformation().id;

		TransferItem(itemId, playerId);
	}
}

async function SellItemHandler(event)
{
	event.preventDefault();

	if (event.target.hasAttribute("item-id"))
	{
		const itemId = event.target.getAttribute("item-id");
		const merchantId = GetCurrentMerchant().id;

		TransferItem(itemId, merchantId);
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
