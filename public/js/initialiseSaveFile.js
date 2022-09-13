const { AddPlayer } = require("./initialiseMerchants");
const { InitialiseLocations } = require("./initialiseLocations");

function InitialiseSaveFile(playerName, saveFileId)
{
    InitialiseLocations(saveFileId);
    AddPlayer(playerName, saveFileId);
    //InitialiseMerchants(playerName, saveFileId);
}

module.exports = { InitialiseSaveFile };