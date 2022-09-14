import { GetPlayerInformation, GetMerchant, GetItemInformationFromLocationId, GeneratePriceForItem, GetAllItemTypes } from "./getData.mjs";

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

async function UpdateItem(itemId, price, itemTypeId, merchantId)
{
    const response = await fetch(`/api/item/${itemId}`, 
    {
        method: 'PUT',
        body: JSON.stringify({ price, itemTypeId, merchantId }),
        headers: {'Content-Type': 'application/json',},
    });

    if (!response.ok) console.log(`Failed to update item: ${itemTypeId}`);
}

async function RemoveItem(itemId)
{
    const response = await fetch(`/api/item/${itemId}`, { method: 'DELETE', });
    if (!response.ok) console.log(`Failed to delete item: ${itemTypeId}`);
}

async function TransferItem(itemData, merchantData, isPlayerBuying)
{
    UpdateItem(itemData.id, itemData.price, itemData.itemTypeId, merchantData.id);

    const playerInfo = await GetPlayerInformation();
    if (isPlayerBuying) playerInfo.coins -= itemData.price;
    else playerInfo.coins += itemData.price;
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

export { AddItem, UpdateItem, RemoveItem, TransferItem, RemoveRandomItem, AddItemRandomlyFromProduced };