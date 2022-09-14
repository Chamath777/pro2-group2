import { AddItemRandomlyFromProduced } from "./itemController.mjs";

let merchantNames = 
[
    "Appoline",
    "Huw",
    "Chamath",
    "Alex",
    "Majdy",
    "Nav",
];

async function AddMerchant(locationData, saveFileId)
{
    const name = PickRandomName();
    const locationId = locationData.id;

    const response = await fetch(`/api/merchant/`, 
    {
        method: 'POST',
        body: JSON.stringify({ merchantType: "npc", name: name, coins: 0, locationId, saveFileId}),
        headers: {'Content-Type': 'application/json',},
    });
    const responseData = await response.json();
    
    if (response.ok === false) alert('Failed to create merchant');
    else InitialiseMerchantStock(responseData.id);
}

async function AddPlayer(playerName, saveFileId, locationId)
{
    const response = await fetch(`/api/merchant/`, 
    {
        method: 'POST',
        body: JSON.stringify({ merchantType: "player", name: playerName, coins: 100, locationId: locationId, saveFileId }),
        headers: {'Content-Type': 'application/json',},
    });

    if (response.ok === false) alert('Failed to create player');
}

function PickRandomName()
{
    const index = Math.round(Math.random() * (merchantNames.length - 1));
    return merchantNames[index];
}

function InitialiseMerchantStock(merchantId)
{
    const numberOfItems = 6 + (Math.round(Math.random() * 15));
    for (let i = 0; i < numberOfItems; i++) AddItemRandomlyFromProduced(merchantId);
}

export { AddMerchant, AddPlayer };