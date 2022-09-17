async function UpdatePlayerLocation(newValue, playerId)
{
    const response = await fetch(`/api/merchant/${playerId}`, 
    {
        method: 'PUT',
        body: JSON.stringify({ locationId: newValue }),
        headers: {'Content-Type': 'application/json',},
    });

    if (!response.ok) console.log(`Failed to update player location`);
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

async function UpdateSaveFile(newDayCount, saveFileId)
{
    const response = await fetch(`/api/saveFile/${saveFileId}`,
	{
		method: 'PUT',
		body: JSON.stringify({ day: newDayCount }),
        headers: {'Content-Type': 'application/json',},
	});

    if (response.ok === false) console.log('Failed to update save file');
}

export { 
    UpdatePlayerLocation, 
    UpdatePlayerCoins,
    UpdateSaveFile
};