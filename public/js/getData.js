async function GetAllItemTypes()
{
    const response = await fetch(`/api/itemType/`, {method: 'GET',});
    if (response.ok === false) alert('Failed to get itemTypes');
    else return response;
}

async function GetMerchant(merchantId)
{
    const response = await fetch(`/api/merchant/${merchantId}`, {method: 'GET',});
    if (response.ok === false) alert('Failed to get merchant');
    else return response;
}

async function GetAllMerchants()
{
    const response = await fetch(`/api/merchant/`, {method: 'GET',});
    if (response.ok === false) alert('Failed to get merchants');
    else return response;
}

async function GetCurrentMerchant()
{
    const response = await fetch(`/api/merchant/currentMerchant`, { method: 'GET', });

    if (response.ok) return response;
    else alert('Failed to find merchant');
}

async function GetPlayerInformation()
{
    const response = await fetch(`/api/merchant/player`, { method: 'GET', });

    if (response.ok) return response;
    else alert('Failed to create item');
}

async function GetItemInformation(itemId)
{
    const response = await fetch(`/api/item/${itemId}`, { method: 'GET', });

    if (response.ok) return response;
    else alert('Failed to find item');
}

async function GetAllLocations()
{
    const data = await fetch(`/api/location`, { method: 'GET' });

    if (data.ok === false) alert('Failed to get locations');
    else return data;
}

function GetItemInformationFromLocation(locationData)
{
    let producedItemIds = [];
    for (let i = 0; i < locationData.itemTypes.length; i++) { producedItemIds.push(locationData.itemTypes[i].id); }
    return producedItemIds;
}

async function GetItemInformationFromLocationId(locationId)
{
    const data = await fetch(`/api/location/${locationId}`, { method: 'GET' });

    if (data.ok === false) alert('Failed to get item types from location');
    else
    {
        let producedItemIds = [];
        for (let i = 0; i < data.itemTypes.length; i++) { producedItemIds.push(data.itemTypes[i].id); }
        return producedItemIds;
    }
}

async function GeneratePriceForItem(itemTypeId, produced)
{
    const data = await fetch(`/api/itemType/${itemTypeId}`, { method: 'GET' });

    if (data.ok === false) alert('Failed to get item types from location');
    else
    {
        if (produced)
        {
            const valueRange = data.basePrice - data.minPrice;
            return data.basePrice + Math.floor(Math.random() * valueRange);
        }
        else
        {
            const valueRange = data.maxPrice - data.basePrice;
            return data.basePrice + Math.floor(Math.random() * valueRange);
        }
    }
}

module.exports = 
{ 
    GetAllItemTypes, 
    GetMerchant, 
    GetAllMerchants, 
    GetPlayerInformation, 
    GetItemInformation, 
    GetAllLocations, 
    GetCurrentMerchant, 
    GetItemInformationFromLocation,
    GetItemInformationFromLocationId,
    GeneratePriceForItem
};