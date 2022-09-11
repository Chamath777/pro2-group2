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

async function TransferItem(itemId, merchantToAddToId)
{
    const itemData = GetItemInformation(itemId);
    UpdateItem(itemId, itemData.price, itemData.itemTypeId, merchantToAddToId);
}

async function GetPlayerInformation()
{
    const response = await fetch(`/api/merchant/player`, { method: 'GET', });

    if (response.ok) return response;
    else alert('Failed to create item');
}

async function GetItemInformation(itemId)
{
    const response = await fetch(`/api/item/${itemId}`, { method: 'GET', });

    if (response.ok) return response;
    else alert('Failed to find item');
}

async function GetCurrentMerchant()
{
    const response = await fetch(`/api/merchant/currentMerchant`, { method: 'GET', });

    if (response.ok) return response;
    else alert('Failed to find merchant');
}

module.exports = { AddItem, UpdateItem, RemoveItem, GetPlayerInformation, GetItemInformation, TransferItem, GetCurrentMerchant };