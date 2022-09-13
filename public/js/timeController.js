const { AddItemRandomlyFromProduced, RemoveRandomItem } = require("./itemController");
const { GetAllMerchants } = require("./getData");

function NewDay()
{
    const currentSaveFile = GetCurrentSaveFile();
    UpdateSaveFile(currentSaveFile.id, currentSaveFile.day + 1);

    const merchantsData = GetAllMerchants();
    for (let i = 0; i < merchantsData.length; i++) 
    {
        if (merchantsData[i].items.length > 10)
        {
            let itemsToRemove = Math.floor(Math.random() * 3);
            for (let j = 0; j < itemsToRemove; j++) RemoveRandomItem(merchantsData[i].id);
        }

        if (merchantsData[i].items.length < 30)
        {
            let itemsToAdd = Math.floor(Math.random() * 5);
            for (let j = 0; j < itemsToAdd; j++) AddItemRandomlyFromProduced(merchantsData[i].id);
        }
    }
}

async function GetCurrentSaveFile()
{
    const response = await fetch(`/api/saveFile/current`, {method: 'GET',});
    if (response.ok === false) alert('Failed to get save file');
    else return response;
}

async function UpdateSaveFile(saveFileId, day)
{
    const response = await fetch(`/api/saveFile/${saveFileId}`,
    {
        method: 'POST',
        body: JSON.stringify({ day }),
        headers: {'Content-Type': 'application/json',},
    });

    if (response.ok === false) alert('Failed to update save file');
}

module.exports = { NewDay };