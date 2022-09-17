import { GetMerchant, GetItemInformationFromLocationId } from "./getData.mjs";

async function AddItem(itemTypeId, merchantId)
{
    const response = await fetch(`/api/item/`, 
    {
        method: 'POST',
        body: JSON.stringify({ itemTypeId, merchantId }),
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
    if (!response.ok) console.log(`Failed to delete item: ${itemId}`);
}

async function TransferItem(itemData, merchantId)
{
    UpdateItem(itemData.id, itemData.itemTypeId, merchantId);
}

//Called each day to stop merchants from ending up with way too many items
async function RemoveRandomItem(merchantId)
{
    const merchantData = await GetMerchant(merchantId);
    const merchantItems = merchantData.items;
    const indexToRemove = Math.floor(Math.random() * (merchantItems.length));
    await RemoveItem(merchantItems[indexToRemove].id);
}

//Called each day to give merchants new stock
async function AddItemRandomlyFromProduced(merchantId)
{
    const merchantData = await GetMerchant(merchantId);
    const itemInformation = await GetItemInformationFromLocationId(merchantData.locationId);
    const index = Math.floor(Math.random() * itemInformation.length);

    await AddItem(itemInformation[index].id, merchantId);
}

export { AddItem, UpdateItem, RemoveItem, TransferItem, RemoveRandomItem, AddItemRandomlyFromProduced };