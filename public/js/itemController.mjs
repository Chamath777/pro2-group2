import { GetMerchant, GetItemInformationFromLocationId, GeneratePriceForItem } from "./getData.mjs";

async function AddItem(price, itemTypeId, merchantId)
{
    const response = await fetch(`/api/item/`, 
    {
        method: 'POST',
        body: JSON.stringify({ price, itemTypeId, merchantId }),
        headers: {'Content-Type': 'application/json',},
    });

    if (!response.ok) console.log(`Failed to create item: ${itemTypeId}`);
}

async function UpdateItem(itemId, itemTypeId, merchantId)
{
    const response = await fetch(`/api/item/${itemId}`, 
    {
        method: 'PUT',
        body: JSON.stringify({ itemTypeId, merchantId }),
        headers: {'Content-Type': 'application/json',},
    });

    if (!response.ok) console.log(`Failed to update item: ${itemTypeId}`);
}

async function RemoveItem(itemId)
{
    const response = await fetch(`/api/item/${itemId}`, { method: 'DELETE', });
    if (!response.ok) console.log(`Failed to delete item: ${itemTypeId}`);
}

async function TransferItem(itemData, merchantId)
{
    UpdateItem(itemData.id, itemData.itemTypeId, merchantId);
}

async function UpdatePlayerCoins(newValue, playerId)
{
    const response = await fetch(`/api/merchant/${playerId}`, 
    {
        method: 'PUT',
        body: JSON.stringify({ coins: newValue }),
        headers: {'Content-Type': 'application/json',},
    });

    if (!response.ok) console.log(`Failed to update player coins`);
}

//Called each day to stop merchants from ending up with way too many items
async function RemoveRandomItem(merchantId)
{
    const merchantItems = await GetMerchant(merchantId).items;
    const indexToRemove = Math.floor(Math.random() * (merchantItems.length));
    await RemoveItem(merchantItems[indexToRemove]);
}

//Called each day to give merchants new stock
async function AddItemRandomlyFromProduced(merchantId)
{
    const merchantData = await GetMerchant(merchantId);
    const itemInformation = await GetItemInformationFromLocationId(merchantData.locationId);
    const index = Math.floor(Math.random() * itemInformation.length);
    const price = await GeneratePriceForItem(itemInformation[index].id, true);

    await AddItem(price, itemInformation[index].id, merchantId);
}

export { AddItem, UpdateItem, RemoveItem, TransferItem, RemoveRandomItem, AddItemRandomlyFromProduced, UpdatePlayerCoins };