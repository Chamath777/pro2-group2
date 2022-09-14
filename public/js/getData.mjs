async function GetAllItemTypes()
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

export { 
    GetAllItemTypes, 
    GetMerchant, 
    GetAllMerchants, 
    GetPlayerInformation, 
    GetItemInformation, 
    GetAllLocations, 
    GetCurrentMerchant, 
    GetItemInformationFromLocation,
    GetItemInformationFromLocationId,
    GeneratePriceForItem,
    GetCurrentUserData
};