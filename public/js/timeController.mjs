import { AddItemRandomlyFromProduced, RemoveRandomItem, RemoveItem } from "./itemController.mjs";
import { GetAllMerchantsInCurrentSaveFile, GetCurrentSaveFile, GetPlayerFoodConsumption, GetPlayerWages, GetPlayerInformation, GetPlayerEdibleItems, GetNumberOfPlayerEdibleItems, GetSessionInformation } from "./getData.mjs";
import { UpdateSaveFile, UpdatePlayerCoins } from "./updateData.mjs";

async function NewDay(daysToPass)
{
    if (daysToPass > 0)
    {
        const success = await UseResources(daysToPass);
        if (success === true)
        {
            await UpdateMerchantStock(daysToPass);
            await IncreaseDayCounter(daysToPass);
        }
        else GameOver(success);
    }
}

async function UpdateMerchantStock(daysToPass)
{
    const merchantsData = await GetAllMerchantsInCurrentSaveFile();

    for (let i = 0; i < merchantsData.length; i++)
    {
        for (let j = 0; j < daysToPass; j++) 
        {
            const itemCount = GetMerchanItemQuantity(merchantsData[i]);

            if (itemCount > 10) RemoveRandomNumberOfItems(3, merchantsData[i]);
            else if (itemCount > 30) RemoveRandomNumberOfItems(8, merchantsData[i]);

            if (itemCount < 30) AddRandomNumberOfItems(5, merchantsData[i]);
            else if (itemCount < 10) AddRandomNumberOfItems(10, merchantsData[i]);
        }
    }
}

function GetMerchanItemQuantity(merchantData)
{
    let count = 0;
    for (let i = 0; i < merchantData.items.length; i++) 
    {
        count += merchantData.items.quantity;
    }
    return count;
}

async function IncreaseDayCounter(daysToPass)
{
    const currentSaveFile = await GetCurrentSaveFile();
    const newDayCount = (parseInt(currentSaveFile.day) + daysToPass);
    await UpdateSaveFile(newDayCount, currentSaveFile.id);
}

async function AddRandomNumberOfItems(maxItems, merchantData)
{
    let itemsToAdd = Math.floor(Math.random() * maxItems);
    for (let j = 0; j < itemsToAdd; j++)
    {
        await AddItemRandomlyFromProduced(merchantData);
    }
}

async function RemoveRandomNumberOfItems(maxItems, merchantData)
{
    let itemsToRemove = Math.floor(Math.random() * maxItems);
    for (let j = 0; j < itemsToRemove; j++)
    {
        await RemoveRandomItem(merchantData);
    }
}

async function UseResources(daysToPass)
{
    const playerData = await GetPlayerInformation();

    const foodPerDay = await GetPlayerFoodConsumption(playerData);
    const foodTotal = foodPerDay * daysToPass;
    const consumeFoodResponse = await ConsumeFood(foodTotal, playerData.id);
    if (consumeFoodResponse === false) { return "noFood"; }

    const wagesPerDay = await GetPlayerWages(playerData);
    const wagesTotal = wagesPerDay * daysToPass;
    const payWagesResponse = await PayWages(playerData, wagesTotal, playerData.id);
    if (payWagesResponse === false) { return "noMoney"; }

    return true;
}

async function ConsumeFood(amountToConsume, playerId)
{
    const playerEdibleItems = await GetPlayerEdibleItems(playerId);
    const numberOfEdibleItems = await GetNumberOfPlayerEdibleItems(playerEdibleItems);

    if (amountToConsume <= numberOfEdibleItems)
    {
        let amountConsumed = 0;
        for (let i = 0; i < playerEdibleItems.length; i++) 
        {
            let quantityOfItem = playerEdibleItems[i].quantity;
            //If this item doesn't have enough to reach the amountToConsume
            const amountRemaining = amountToConsume - amountConsumed;
            if (amountRemaining > quantityOfItem)
            {
                await RemoveItem(playerEdibleItems[i].itemTypeId, playerId, quantityOfItem);
                amountConsumed += quantityOfItem;
            }
            else
            {
                await RemoveItem(playerEdibleItems[i].itemTypeId, playerId, amountRemaining);
                return true;
            }
        }
        return true;
    }
    else return false;
}

async function PayWages(playerData, amountPaid, playerId)
{
    const newCoinCount = parseInt(playerData.coins) - parseInt(amountPaid);
    if (amountPaid <= playerData.coins)
    {
        await UpdatePlayerCoins(newCoinCount, playerId);
        return true;
    }
    else return false;
}

async function GameOver(message)
{
    await DeleteCurrentSaveFile();
    document.location.replace(`/gameOver/${message}`);
}

async function DeleteCurrentSaveFile()
{
    const sessionInfo = await GetSessionInformation();
    const response = await fetch(`/api/saveFile/${sessionInfo.saveFileId}`, { method: 'DELETE', });
    if (!response.ok) console.log(`Failed to delete save file: ${sessionInfo.saveFileId}`);
}

export { NewDay };