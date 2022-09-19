import { GetMerchantItemTypeStatus } from "./getData.mjs";

async function AddItem(itemTypeId, merchantId, quantity)
{
    const merchantData = await GetMerchantItemTypeStatus(merchantId, itemTypeId);
    
    //If the merchant does not already have at least one of that item type then create a new item
    if (merchantData === null)
    {
        const response = await fetch(`/api/item/`, 
        {
            method: 'POST',
            body: JSON.stringify({ quantity, itemTypeId, merchantId }),
            headers: {'Content-Type': 'application/json',},
        });

        if (!response.ok) console.log(`Failed to create item: ${itemTypeId}`);
    }
    else //Otherwise increase the item quantity
    {
        const newQuantity = merchantData.items[0].quantity + quantity;
        await UpdateItem(merchantData.items[0].id, itemTypeId, merchantId, newQuantity);
    }
}

async function RemoveItem(itemTypeId, merchantId, quantity)
{
    const merchantData = await GetMerchantItemTypeStatus(merchantId, itemTypeId);
    
    if (merchantData === null) { console.log(`You are trying to remove an item (itemTypeId: ${itemTypeId}) from a merchant (id: ${merchantId}) that does not have the item!`); }
    else
    {
        const currentItemQuantity = merchantData.items[0].quantity;

        if (currentItemQuantity > quantity)
        {
            const newQuantity = currentItemQuantity - quantity;
            await UpdateItem(merchantData.items[0].id, itemTypeId, merchantId, newQuantity);
        }
        else if (currentItemQuantity == quantity)
        {
            await DeleteItem(merchantData.items[0].id);
        }
        else { console.log(`That merchant has ${currentItemQuantity} or that item but you are trying to remove ${quantity}!`); }
    }
}

async function UpdateItem(itemId, itemTypeId, merchantId, quantity)
{
    const response = await fetch(`/api/item/${itemId}`, 
    {
        method: 'PUT',
        body: JSON.stringify({ quantity, itemTypeId, merchantId }),
        headers: {'Content-Type': 'application/json',},
    });

    if (!response.ok) console.log(`Failed to update item: ${itemTypeId}`);
}

async function DeleteItem(itemId)
{
    const response = await fetch(`/api/item/${itemId}`, { method: 'DELETE', });
    if (!response.ok) console.log(`Failed to delete item: ${itemId}`);
}

async function TransferItem(itemTypeId, transferToId, transferFromId, quantity)
{
    await RemoveItem(itemTypeId, transferFromId, quantity);
    await AddItem(itemTypeId, transferToId, quantity);
}

//Called each day to stop merchants from ending up with too many items
async function RemoveRandomItem(merchantData)
{
    const merchantItems = merchantData.items;
    const indexToRemove = Math.floor(Math.random() * (merchantItems.length));
    await RemoveItem(merchantItems[indexToRemove].itemTypeId, merchantData.id, 1);
}

//Called each day to give merchants new stock
async function AddItemRandomlyFromProduced(merchantData, producedItems, quantity)
{   
    const index = Math.floor(Math.random() * producedItems.length);
    await AddItem(producedItems[index].locationItemInformation.itemTypeId, merchantData.id, quantity);
}

export { AddItem, UpdateItem, RemoveItem, DeleteItem, TransferItem, RemoveRandomItem, AddItemRandomlyFromProduced };