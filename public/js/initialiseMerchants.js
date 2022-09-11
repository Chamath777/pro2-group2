const { AddItem } = require("./itemController");

let merchantId = 0;
let merchantNames = 
[
    "Appoline",
    "Huw",
    "Chamath",
    "Alex",
    "Majdy",
    "Nav",
];

async function InitialiseMerchants()
{
    const locationData = await GetLocationData();
    for (let i = 0; i < locationData.length; i++) 
    {
        AddMerchant("npc", locationData[i].id, locationData[i]);
    }
}

async function AddMerchant(merchantType, locationId, locationData)
{
    const name = PickRandomName();

    const response = await fetch(`/api/merchant/`, 
    {
        method: 'POST',
        body: JSON.stringify({ name, merchantType, locationId }),
        headers: {'Content-Type': 'application/json',},
    });

    if (response.ok === false) alert('Failed to create merchant');
    else
    {
        merchantId++;
        InitialiseMerchantStock(locationData);
    }
}

function PickRandomName()
{
    const index = Math.round(Math.random() * (merchantNames.length - 1));
    return merchantNames[index];
}

function InitialiseMerchantStock(locationData)
{
    const producedItemIds = GetProducedItemTypesFromLocation(locationData);
    const numberOfItems = 6 + (Math.round(Math.random() * 15));

    for (let i = 0; i < numberOfItems; i++)
    {
        const itemIdIndex = Math.round(Math.random() * (producedItemIds.length - 1));
        AddItem(1000, producedItemIds[itemIdIndex], merchantId);
    }
}

async function GetLocationData()
{
    const data = await fetch(`/api/location`, { method: 'GET' });

    console.log(data);
    if (data.ok === false) alert('Failed to get item types from locations');
    else return data;
}

function GetProducedItemTypesFromLocation(locationData)
{
    let producedItemIds = [];
    for (let i = 0; i < locationData.itemTypes.length; i++) { producedItemIds.push(locationData.itemTypes[i].id); }
    return producedItemIds;
}

async function GetProducedItemTypesFromLocationId(locationId)
{
    const data = await fetch(`/api/location${locationId}`, { method: 'GET' });

    if (data.ok === false) alert('Failed to get item types from location');
    else
    {
        let producedItemIds = [];
        for (let i = 0; i < data.itemTypes.length; i++) { producedItemIds.push(data.itemTypes[i].id); }
        return producedItemIds;
    }
}

module.exports = { InitialiseMerchants };