async function GetAllItemTypes()
{
    const response = await fetch(`/api/itemType/`, {method: 'GET',});
    const responseData = await response.json();

    if (response.ok === false) console.log('Failed to get itemTypes');
    else return responseData;
}

async function GetAllPlayerFoodItems()
{
    const response = await fetch(`/api/itemType/`, {method: 'GET',});
    const responseData = await response.json();

    if (response.ok === false) console.log('Failed to get itemTypes');
    else return responseData;
}

async function GetMerchant(merchantId)
{
    const response = await fetch(`/api/merchant/${merchantId}`, {method: 'GET',});
    const responseData = await response.json();

    if (response.ok === false) console.log('Failed to get merchant');
    else return responseData;
}

async function GetAllMerchants()
{
    const response = await fetch(`/api/merchant/`, {method: 'GET',});
    const responseData = await response.json();

    if (response.ok === false) console.log('Failed to get merchants');
    else return responseData;
}

async function GetAllMerchantsInCurrentSaveFile()
{
    //Doesn't get the player
    const response = await fetch(`/api/merchant/inCurrentSaveFile`, {method: 'GET',});
    const responseData = await response.json();

    if (response.ok === false) console.log('Failed to get merchants');
    else return responseData;
}

async function GetMerchantItemTypeStatus(merchantId, itemTypeId)
{
    const doesMerchantAlreadyHaveItemTypeResponse = await fetch(`/api/merchant/doesMerchantAlreadyHaveItemType/${merchantId}/${itemTypeId}`, { method: 'GET', });
    const doesMerchantAlreadyHaveItemTypeData = await doesMerchantAlreadyHaveItemTypeResponse.json();
    return doesMerchantAlreadyHaveItemTypeData;
}

async function GetCurrentMerchant()
{
    const response = await fetch(`/api/merchant/currentMerchant`, { method: 'GET', });
    const responseData = await response.json();

    if (response.ok) return responseData;
    else console.log('Failed to find merchant');
}

async function GetPlayerInformation()
{
    const response = await fetch(`/api/merchant/player`, { method: 'GET', });
    const responseData = await response.json();

    if (response.ok) return responseData;
    else console.log('Failed to create item');
}

async function GetPlayerCarryingCapacity(playerData)
{
    let carryingCapacity = 100;
    for (let i = 0; i < playerData.workers; i++) carryingCapacity += 100;
    for (let i = 0; i < playerData.horses; i++) carryingCapacity += 250;
    return carryingCapacity;
}

async function GetPlayerCarrying(playerData)
{
    let carrying = 0;
    const itemTypes = GetAllItemTypes();
    for (let i = 0; i < playerData.items.length; i++) 
    {
        for (let j = 0; j < itemTypes.length; j++) 
        {
            if (playerData.items[i].itemTypeId === itemTypes[j].id)
            {
                carrying += itemTypes[j].weight * playerData.items[i].quantity;
            }
        }
    }
    return carrying;
}

async function GetPlayerFoodConsumption(playerData)
{
    return playerData.workers + playerData.horses;
}

async function GetPlayerWages(playerData)
{
    return playerData.workers * 3;
}

async function GetPlayerProgress()
{
    const response = await fetch(`/api/playerProgress/current`, { method: 'GET', });
    const responseData = await response.json();

    if (response.ok) return responseData;
    else console.log('Failed to create item');
}

async function GetPlayerEdibleItems(playerId)
{
    const response = await fetch(`/api/item/playerFoodItems/${playerId}`, { method: 'GET', });
    const responseData = await response.json();

    if (response.ok) return responseData;
    else console.log('Failed to get playerFoodItems');
}

async function GetNumberOfPlayerEdibleItems(items)
{
    let count = 0;
    for (let i = 0; i < items.length; i++) 
    {
        count += items[i].quantity;
    }
    return count;
}

async function GetItemInformation(itemId)
{
    const response = await fetch(`/api/item/${itemId}`, { method: 'GET', });
    const responseData = await response.json();

    if (response.ok) return responseData;
    else console.log('Failed to find item');
}

async function GetItemTypeFromId(itemTypeId)
{
    const response = await fetch(`/api/itemType/${itemTypeId}`, { method: 'GET', });
    const responseData = await response.json();

    if (response.ok) return responseData;
    else console.log('Failed to find item');
}

async function GetAllLocations()
{
    const response = await fetch(`/api/location`, { method: 'GET' });
    const responseData = await response.json();

    if (response.ok === false) console.log('Failed to get locations');
    else return responseData;
}

function GetItemInformationFromLocation(locationData)
{
    let producedItemIds = [];
    for (let i = 0; i < locationData.itemTypes.length; i++) { producedItemIds.push(locationData.itemTypes[i].id); }
    return producedItemIds;
}

async function GetItemInformationFromLocationId(locationId)
{
    const response = await fetch(`/api/location/${locationId}`, { method: 'GET' });
    const responseData = await response.json();

    if (response.ok === false) console.log('Failed to get item types from location');
    else return responseData.itemTypes;
}

async function GetProducedItemInformationFromLocationId(locationId)
{
    const response = await fetch(`/api/location/${locationId}`, { method: 'GET' });
    const responseData = await response.json();

    let producedHere = [];
    for (let i = 0; i < responseData.itemTypes.length; i++) 
    {
        if (responseData.itemTypes[i].locationItemInformation.isItemProducedHere) producedHere.push(responseData.itemTypes[i]);
    }

    if (response.ok === false) console.log('Failed to get item types from location');
    else return producedHere;
}

async function GeneratePriceForItem(itemTypeId, produced)
{
    const response = await fetch(`/api/itemType/${itemTypeId}`, { method: 'GET' });
    const responseData = await response.json();

    if (response.ok === false) console.log('Failed to generate price for item');
    else
    {
        if (produced) return GetRandomRange(responseData.minPrice, responseData.basePrice);
        else return GetRandomRange(responseData.basePrice, responseData.maxPrice);
    }
}

async function GetCurrentUserData()
{
    const response = await fetch(`/api/user/${userId}`, { method: 'GET' });
    const responseData = await response.json();

    if (response.ok === false) alert('Failed to get locations');
    else return responseData;
}

function GetRandomRange(min, max)
{
    const delta = max - min;
    return min + (Math.floor(Math.random() * delta));
}

async function GetCurrentSaveFile()
{
    const response = await fetch(`/api/saveFile/current`, {method: 'GET',});
    const responseData = await response.json();

    if (response.ok === false) console.log('Failed to get save file');
    else return responseData;
}

async function GetSessionInformation()
{
    const response = await fetch(`/api/saveFile/session`, {method: 'GET',});
    const responseData = await response.json();

    if (response.ok === false) console.log('Failed to get session info');
    else return responseData;
}

export { 
    GetAllItemTypes,
    GetAllPlayerFoodItems,
    GetMerchant, 
    GetAllMerchants,
    GetAllMerchantsInCurrentSaveFile,
    GetMerchantItemTypeStatus,
    GetPlayerInformation,
    GetPlayerCarryingCapacity,
    GetPlayerCarrying,
    GetPlayerFoodConsumption,
    GetPlayerWages,
    GetPlayerProgress,
    GetPlayerEdibleItems,
    GetNumberOfPlayerEdibleItems,
    GetItemInformation,
    GetItemTypeFromId,
    GetAllLocations, 
    GetCurrentMerchant, 
    GetItemInformationFromLocation,
    GetItemInformationFromLocationId,
    GetProducedItemInformationFromLocationId,
    GeneratePriceForItem,
    GetCurrentUserData,
    GetCurrentSaveFile,
    GetSessionInformation
};