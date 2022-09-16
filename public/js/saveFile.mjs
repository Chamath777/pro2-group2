import { InitialiseSaveFile } from "./initialiseSaveFile.mjs";

async function NewGameHandler(event) {
  event.preventDefault();

  document.querySelector("#spinner").classList.remove("is-disabled");

  const newGameName = document.querySelector("#new-game").value.trim();

  if (newGameName) {
    const response = await CreateNewSaveFile();
    const responseData = await response.json();

    if (response.ok) {
      await InitialiseSaveFile(newGameName, responseData.id);
      document.location.replace(`/worldMap/${responseData.id}`);
    } else console.log(response.statusText);
  }
}

async function CreateNewSaveFile() {
  const response = await fetch(`/api/saveFile`, {
    method: "POST",
    body: JSON.stringify({}),
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

async function DeleteGameHandler(event) {
  if (event.target.hasAttribute("data-id")) {
    const saveFileId = event.target.getAttribute("data-id");
    const response = await DeleteSaveFile(saveFileId);

    if (response.ok) location.reload();
    else console.log(response.statusText);
  }
}

async function DeleteSaveFile(saveFileId) {
  const response = await fetch(`/api/saveFile/${saveFileId}`, {
    method: "DELETE",
  });
  return response;
}

async function GoToExistingGameHandler(event) {
  if (event.target.hasAttribute("data-id")) {
    const saveFileId = event.target.getAttribute("data-id");
    if (saveFileId) document.location.replace(`/worldMap/${saveFileId}`);
    else console.log("No save file id");
  }
}

function SetupUserSaveFiles() {
  const deleteButtons = document.querySelectorAll(".delete-game");
  const startButtons = document.querySelectorAll(".existing-game");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", DeleteGameHandler);
  }

  for (let i = 0; i < startButtons.length; i++) {
    startButtons[i].addEventListener("click", GoToExistingGameHandler);
  }
}

document.querySelector(".new-game").addEventListener("click", NewGameHandler);

SetupUserSaveFiles();
