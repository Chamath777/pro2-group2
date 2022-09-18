import { InitialiseLocations } from "./initialiseLocations.mjs";
import { CreateInitialPlayerProgress } from "./timeController.mjs"

async function InitialiseSaveFile(playerName, saveFileId)
{
    await InitialiseLocations(playerName, saveFileId);
    await CreateInitialPlayerProgress(saveFileId);
}

export { InitialiseSaveFile };