import { AddMerchant, AddPlayer } from "./initialiseMerchants.mjs";
import { GetAllItemTypes, GeneratePriceForItem } from "./getData.mjs";

let locationNames = 
[
    "Yurgistan",
    "Roumatta",
    "Parga",
    "Helligi",
    "Chaoli",
];

let locationPositions = 
[
    [2, 2],
    [1, 1],
    [0, 0],
    [2, 0],
    [3, 1],
];

async function InitialiseLocations(playerName, saveFileId)
{
    const locationIndexForPlayerToStartAt = Math.floor(Math.random() * locationNames.length);

    for (let i = 0; i < locationNames.length; i++) 
    {
        const xPosition = locationPositions[i][0];
        const yPosition = locationPositions[i][1];
        await AddLocation(locationNames[i], xPosition, yPosition, saveFileId, (i === locationIndexForPlayerToStartAt ? true : false), playerName);
    }
}

async function AddLocation(name, xPosition, yPosition, saveFileId, addPlayer, playerName)
{
    const response = await fetch(`/api/location/`, 
    {
        method: 'POST',
        body: JSON.stringify({ name, xPosition, yPosition, saveFileId }),
        headers: {'Content-Type': 'application/json',},
    });
    const responseData = await response.json();

    if (response.ok === false) console.log('Failed to create location');
    else 
    {
        await AddProducedItemTypes(responseData.id);
        await AddMerchant(responseData, saveFileId);
        if (addPlayer) await AddPlayer(playerName, saveFileId, responseData.id);
    }
}

async function AddProducedItemTypes(locationId)
{
    const itemTypes = await GetAllItemTypes();
    //Set all the items to initially not be produced
    const itemTypesToProduce = [];
    for (let i = 0; i < itemTypes.length; i++) { itemTypesToProduce.push(false); }
    //Choose a random number of items to be produced
    const numberOfItemTypes = 6 + Math.floor(Math.random() * 6);
    //Set some of the items to be produced
    for (let i = 0; i < numberOfItemTypes; i++)
    {
        const itemTypeIndex = Math.floor(Math.random() * (itemTypes.length));
        if (itemTypesToProduce[itemTypeIndex] === true)
        {
            if (itemTypesToProduce.length < itemTypeIndex) itemTypesToProduce[itemTypeIndex + 1] = true;
        }
        else itemTypesToProduce[itemTypeIndex] = true;
    }

    for (let i = 0; i < itemTypes.length; i++)
    {
        const price = await GeneratePriceForItem(itemTypes[i].id, itemTypesToProduce[i]);
        await AddProducedItemType(locationId, price, itemTypes[i].id, itemTypesToProduce[i]);
    }
}

async function AddProducedItemType(locationId, price, itemTypeId, produced)
{
    const response = await fetch(`/api/locationItemInformation/`, 
    {
        method: 'POST',
        body: JSON.stringify({ isItemProducedHere: produced, price, locationId, itemTypeId }),
        headers: {'Content-Type': 'application/json',},
    });

    if (response.ok === false) console.log('Failed to create produced item type');
}

export { InitialiseLocations };