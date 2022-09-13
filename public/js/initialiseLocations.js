const { AddMerchant } = require("./initialiseMerchants");
const { GetAllItemTypes, GeneratePriceForItem } = require("./getData");

let locationNames = 
[
    "Yurgistan",
    "Roumatta",
    "Parga",
    "Helligi",
    "Chaoli",
];

async function InitialiseLocations(saveFileId)
{
    for (let i = 0; i < locationNames.length; i++) 
    {
        AddLocation(locationNames[i], saveFileId);
    }
}

async function AddLocation(name, saveFileId)
{
    const response = await fetch(`/api/location/`, 
    {
        method: 'POST',
        body: JSON.stringify({ name, saveFileId }),
        headers: {'Content-Type': 'application/json',},
    });

    if (response.ok === false) alert('Failed to create location');
    else 
    {
        AddProducedItemTypes(response.id);
        AddMerchant("npc", response, saveFileId);
    }
}

async function AddProducedItemTypes(locationId)
{
    const itemTypes = GetAllItemTypes();
    //Set all the items to initially not be produced
    const itemTypesToProduce = [];
    for (let i = 0; i < itemTypes.length; i++) { itemTypesToProduce.push(false); }
    //Choose a random number of items to be produced
    const numberOfItemTypes = 1 + Math.floor(Math.random * 3);
    //Set some of the items to be produced
    for (let i = 0; i < numberOfItemTypes; i++)
    {
        const itemTypeIndex = Math.floor(Math.random * 3);
        itemTypesToProduce[itemTypeIndex] = true;
    }

    for (let i = 0; i < itemTypes.length; i++)
    {
        AddProducedItemType(locationId, itemTypes[i], itemTypesToProduce[i]);
    }
}

async function AddProducedItemType(locationId, itemTypeId, produced)
{
    const price = GeneratePriceForItem(itemTypeId, produced);
    const response = await fetch(`/api/producedItemType/`, 
    {
        method: 'POST',
        body: JSON.stringify({ isItemProducedHere: produced, price, locationId, itemTypeId }),
        headers: {'Content-Type': 'application/json',},
    });

    if (response.ok === false) alert('Failed to create produced item type');
}

module.exports = { InitialiseLocations };