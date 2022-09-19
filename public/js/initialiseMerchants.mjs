import { GetProducedItemInformationFromLocationId } from "./getData.mjs";
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
    const producedItems = await GetProducedItemInformationFromLocationId(locationData.id);

    if (response.ok === false) alert('Failed to create merchant');
    else await InitialiseMerchantStock(responseData, producedItems);
}

async function AddPlayer(playerName, saveFileId, locationId)
{
    const response = await fetch(`/api/merchant/`,
    {
        method: 'POST',
        body: JSON.stringify({ merchantType: "player", name: playerName, coins: 200, workers: 0, horses: 1, locationId: locationId, saveFileId }),
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
    await AddItem(1, merchantId, 5);
    await AddItem(2, merchantId, 5);
    await AddItem(3, merchantId, 5);
}

async function InitialiseMerchantStock(merchantData, producedItems)
{
    //const merchantData = await GetMerchant(merchantId);
    const numberOfItems = 3 + (Math.round(Math.random() * 5));
    const itemQuantity = 1 + (Math.round(Math.random() * 3));
    for (let i = 0; i < numberOfItems; i++) await AddItemRandomlyFromProduced(merchantData, producedItems, itemQuantity);
}

export { AddMerchant, AddPlayer };