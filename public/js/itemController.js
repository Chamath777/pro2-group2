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

module.exports = { AddItem, UpdateItem, RemoveItem };