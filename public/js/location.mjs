import { GetPlayerInformation, GetItemInformation, GetCurrentMerchant, GetSessionInformation } from "./getData.mjs";
import { UpdatePlayerCoins, UpdatePlayerHorses, UpdatePlayerWorkers } from "./updateData.mjs";
import { TransferItem } from "./itemController.mjs";

const horseBuyCost = 80;
const horseSellPrice = 60;
const workerHireCost = 30;

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
			RefreshPage();
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

		RefreshPage();
	}
}

function RefreshPage()
{
	location.reload();
}

async function BuyHorse()
{
	const playerData = await GetPlayerInformation();
	const newValue = parseInt(playerData.horses) + 1;
	await UpdatePlayerHorses(newValue, playerData.id);
	const newPlayerCoins = parseInt(playerData.coins) - parseInt(horseBuyCost);
	await UpdatePlayerCoins(newPlayerCoins, playerData.id);

	RefreshPage();
}

async function SellHorse()
{
	const playerData = await GetPlayerInformation();
	const newValue = parseInt(playerData.horses) - 1;
	await UpdatePlayerHorses(newValue, playerData.id);
	const newPlayerCoins = parseInt(playerData.coins) + parseInt(horseSellPrice);
	await UpdatePlayerCoins(newPlayerCoins, playerData.id);

	RefreshPage();
}

async function HireWorker()
{
	const playerData = await GetPlayerInformation();
	const newValue = parseInt(playerData.workers) + 1;
	await UpdatePlayerWorkers(newValue, playerData.id);
	const newPlayerCoins = parseInt(playerData.coins) - parseInt(workerHireCost);
	await UpdatePlayerCoins(newPlayerCoins, playerData.id);

	RefreshPage();
}

async function DismissWorker()
{
	const playerData = await GetPlayerInformation();
	const newValue = parseInt(playerData.workers) - 1;
	await UpdatePlayerWorkers(newValue, playerData.id);

	RefreshPage();
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

	const buyHorseButton = document.querySelector("#buy-horse");
	if (buyHorseButton) buyHorseButton.addEventListener("click", BuyHorse);

	const sellHorseButton = document.querySelector("#sell-horse");
	if (sellHorseButton) sellHorseButton.addEventListener("click", SellHorse);

	const hireWorkerButton = document.querySelector("#hire-worker");
	if (hireWorkerButton) hireWorkerButton.addEventListener("click", HireWorker);

	const dismissWorkerButton = document.querySelector("#dismiss-worker");
	if (dismissWorkerButton) dismissWorkerButton.addEventListener("click", DismissWorker);
}

document.querySelector(".world-map")
        .addEventListener("click", BackToMapHandler);

SetupBuyAndSellButtons();