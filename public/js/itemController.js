const { GetPlayerInformation, GetMerchant, GetItemInformationFromLocationId, GeneratePriceForItem } = require("./getData");

async function AddItem(price, itemTypeId, merchantId)
{
    const response = await fetch(`/api/merchant/`, 
    {
        method: 'POST',
        body: JSON.stringify({ price, itemTypeId, merchantId }),
        headers: {'Content-Type': 'application/json',},
    });

    if (response.ok) console.log(`Created the item: ${itemTypeId}`);
    else alert('Failed to create item');
}

async function UpdateItem(itemId, price, itemTypeId, merchantId)
{
    const response = await fetch(`/api/item/${itemId}`, 
    {
        method: 'PUT',
        body: JSON.stringify({ price, itemTypeId, merchantId }),
        headers: {'Content-Type': 'application/json',},
    });

    if (response.ok) console.log(`Updated the item: ${itemTypeId}`);
    else alert('Failed to update item');
}

async function RemoveItem(itemId)
{
    const response = await fetch(`/api/item/${itemId}`, 
    {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', },
    });

    if (response.ok) console.log(`Deleted the item: ${itemTypeId}`);
    else alert('Failed to delete item');
}

async function TransferItem(itemData, merchantData, isPlayerBuying)
{
    UpdateItem(itemData.id, itemData.price, itemData.itemTypeId, merchantData.id);

    const playerInfo = GetPlayerInformation();
    if (isPlayerBuying) playerInfo.coins -= itemData.price;
    else playerInfo.coins += itemData.price;
}

//Called each day to stop merchants from ending up with way too many items
async function RemoveRandomItem(merchantId)
{
    const merchantItems = GetMerchant(merchantId).items;
    const indexToRemove = Math.floor(Math.random() * (merchantItems.length - 1));

    const response = await fetch(`/api/item/${merchantItems[indexToRemove]}`, { method: 'DELETE' });

    if (response.ok) console.log(`Deleted the item: ${itemTypeId}`);
    else alert('Failed to delete item');
}

//Called each day to give merchants new stock
async function AddItemRandomlyFromProduced(merchantId)
{
    const merchantData = GetMerchant(merchantId);
    const itemInformation = GetItemInformationFromLocationId(merchantData.locationId);
    const produced = [];
    for (let i = 0; i < itemInformation; i++) { if (itemInformation[i].produced) produced.push(itemInformation[i]); }
    const index = Math.floor(Math.random() * (produced.length - 1));

    AddItem(GeneratePriceForItem(true), produced[index].id, merchantId);
}

module.exports = { AddItem, UpdateItem, RemoveItem, TransferItem, RemoveRandomItem, AddItemRandomlyFromProduced };