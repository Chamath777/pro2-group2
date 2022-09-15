import { InitialiseLocations } from "./initialiseLocations.mjs";

async function InitialiseSaveFile(playerName, saveFileId)
{
    await InitialiseLocations(playerName, saveFileId);
}

export { InitialiseSaveFile };