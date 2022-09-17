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
    let carryingCapacity = 0;
    for (let i = 0; i < playerData.workers; i++) carryingCapacity += 100;
    for (let i = 0; i < playerData.horses; i++) carryingCapacity += 250;
    return carryingCapacity;
}

async function GetPlayerFoodConsumption(playerData)
{
    let foodConsumption = 0;
    for (let i = 0; i < playerData.workers; i++) foodConsumption += 1;
    for (let i = 0; i < playerData.horses; i++) foodConsumption += 1;
    return foodConsumption;
}

async function GetPlayerWages(playerData)
{
    let wages = 0;
    for (let i = 0; i < playerData.workers; i++) wages += 3;
    return wages;
}

async function GetPlayerEdibleItems(playerId)
{
    const response = await fetch(`/api/item/playerFoodItems/${playerId}`, { method: 'GET', });
    const responseData = await response.json();

    if (response.ok) return responseData;
    else console.log('Failed to get playerFoodItems');
}

async function GetItemInformation(itemId)
{
    const response = await fetch(`/api/item/${itemId}`, { method: 'GET', });
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
    GetMerchant, 
    GetAllMerchants,
    GetAllMerchantsInCurrentSaveFile,
    GetPlayerInformation,
    GetPlayerCarryingCapacity,
    GetPlayerFoodConsumption,
    GetPlayerWages,
    GetPlayerEdibleItems,
    GetItemInformation, 
    GetAllLocations, 
    GetCurrentMerchant, 
    GetItemInformationFromLocation,
    GetItemInformationFromLocationId,
    GeneratePriceForItem,
    GetCurrentUserData,
    GetCurrentSaveFile,
    GetSessionInformation
};