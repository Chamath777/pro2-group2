import { AddItem, AddItemRandomlyFromProduced } from "./itemController.mjs";

let merchantNames = 
[
    "Appoline",
    "Huw",
    "Chamath",
    "Alex",
    "Majdy",
    "Nav",
    "Annie",
    "Ben",
    "Brad",
    "Caroline",
    "Alan",
    "John",
    "Mark",
    "Roger",
    "Roman",
    "Sam",
    "Stathis",
];

async function AddMerchant(locationData, saveFileId)
{
    const name = PickRandomName();
    const locationId = locationData.id;

    const response = await fetch(`/api/merchant/`, 
    {
        method: 'POST',
        body: JSON.stringify({ merchantType: "npc", name: name, locationId, saveFileId}),
        headers: {'Content-Type': 'application/json',},
    });
    const responseData = await response.json();
    
    if (response.ok === false) alert('Failed to create merchant');
    else await InitialiseMerchantStock(responseData.id);
}

async function AddPlayer(playerName, saveFileId, locationId)
{
    const response = await fetch(`/api/merchant/`,
    {
        method: 'POST',
        body: JSON.stringify({ merchantType: "player", name: playerName, coins: 200, workers: 1, horses: 1, locationId: locationId, saveFileId }),
        headers: {'Content-Type': 'application/json',},
    });
    const responseData = await response.json();

    if (response.ok === false) alert('Failed to create player');
    await InitialisePlayerItems(responseData.id);
}

function PickRandomName()
{
    const index = Math.round(Math.random() * (merchantNames.length - 1));
    return merchantNames[index];
}

async function InitialisePlayerItems(merchantId)
{
    for (let i = 0; i < 2; i++) await AddItem(1, merchantId);
    for (let i = 0; i < 2; i++) await AddItem(2, merchantId);
    await AddItem(3, merchantId);
}

async function InitialiseMerchantStock(merchantId)
{
    const numberOfItems = 6 + (Math.round(Math.random() * 15));
    for (let i = 0; i < numberOfItems; i++) await AddItemRandomlyFromProduced(merchantId);
}

export { AddMerchant, AddPlayer };