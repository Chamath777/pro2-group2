import { AddItemRandomlyFromProduced, RemoveRandomItem, RemoveItem } from "./itemController.mjs";
import { GetAllMerchantsInCurrentSaveFile, GetCurrentSaveFile, GetPlayerFoodConsumption, GetPlayerWages, GetPlayerInformation, GetPlayerEdibleItems } from "./getData.mjs";
import { UpdateSaveFile, UpdatePlayerCoins } from "./updateData.mjs";

async function NewDay()
{
    const success = await UseResources();
    if (success === false) return;
    await UpdateMerchantStock();
    await IncreaseDayCounter();
}

async function UpdateMerchantStock()
{
    const merchantsData = await GetAllMerchantsInCurrentSaveFile();

    for (let i = 0; i < merchantsData.length; i++)
    {
        const merchantId = merchantsData[i].id;
        
        if (merchantsData[i].items.length > 10) RemoveRandomNumberOfItems(3, merchantId);
        else if (merchantsData[i].items.length > 30) RemoveRandomNumberOfItems(8, merchantId);

        if (merchantsData[i].items.length < 30) AddRandomNumberOfItems(5, merchantId);
        else if (merchantsData[i].items.length < 10) AddRandomNumberOfItems(10, merchantId);
    }
}

async function IncreaseDayCounter()
{
    const currentSaveFile = await GetCurrentSaveFile();
    const newDayCount = (parseInt(currentSaveFile.day) + 1);
    await UpdateSaveFile(newDayCount, currentSaveFile.id);
}

async function AddRandomNumberOfItems(maxItems, merchantId)
{
    let itemsToAdd = Math.floor(Math.random() * maxItems);
    for (let j = 0; j < itemsToAdd; j++)
    {
        await AddItemRandomlyFromProduced(merchantId);
    }
}

async function RemoveRandomNumberOfItems(maxItems, merchantId)
{
    let itemsToRemove = Math.floor(Math.random() * maxItems);
    for (let j = 0; j < itemsToRemove; j++)
    {
        await RemoveRandomItem(merchantId);
    }
}

async function UseResources()
{
    const playerData = await GetPlayerInformation();

    const foodConsumption = await GetPlayerFoodConsumption(playerData);
    const consumeFoodResponse = await ConsumeFood(foodConsumption, playerData.id);
    if (consumeFoodResponse === null) { GameOver("You did not have enough food to feed everyone! Game Over"); return false; }

    const wages = await GetPlayerWages(playerData);
    const payWagesResponse = await PayWages(playerData, wages, playerData.id);
    if (payWagesResponse === null) { GameOver("You did not have enough money to pay wages! Game Over"); return false; }
    
    return true;
}

async function ConsumeFood(amountConsumed, playerId)
{
    const playerEdibleItems = await GetPlayerEdibleItems(playerId);
    for (let i = 0; i < amountConsumed; i++) 
    {
        if (amountConsumed <= playerEdibleItems.length)
        {
            await RemoveItem(playerEdibleItems[i].id);
        }
        else return null;
    }
}

async function PayWages(playerData, amountPaid, playerId)
{
    const newCoinCount = parseInt(playerData.coins) - parseInt(amountPaid);
    if (amountPaid <= playerData.coins)
    {
        await UpdatePlayerCoins(newCoinCount, playerId);
    }
    else return null;
}

async function GameOver(message)
{
    console.log(message);
}

export { NewDay };