//const { GetCurrentUserData } = require("./getData");

async function NewGameHandler(event) {
  event.preventDefault();

  const newGameName = document.querySelector("#new-game").value.trim();

  if (newGameName) {
    const response = await fetch(`/api/saveFile`, {
      method: "POST",
      body: JSON.stringify({ newGameName }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) document.location.replace(`/worldMap`);
    else alert(response.statusText);
  }
}

async function DeleteGameHandler(event) {
  if (event.target.hasAttribute("data-id")) {
    const saveFileId = event.target.getAttribute("data-id");

    const response = await fetch(`/api/saveFile/${saveFileId}`, {
      method: "DELETE",
    });

    if (response.ok) document.location.replace(`/saveFile`);
    else alert(response.statusText);
  }
}

async function GoToExistingGameHandler(event) {
  if (event.target.hasAttribute("data-id")) {
    const saveFileId = event.target.getAttribute("data-id");

    const response = await fetch(`/api/saveFile/${saveFileId}`, {
      method: "GET",
    });

    if (response.ok) document.location.replace(`/worldMap`);
    else alert(response.statusText);
  }
}

function SetupUserSaveFiles()
{
  const deleteButtons = document.querySelectorAll(".delete-game");
  const startButtons = document.querySelectorAll(".existing-game");

  for (let i = 0; i < deleteButtons; i++) 
  {
    deleteButtons[i].addEventListener("click", DeleteGameHandler);
  }

  for (let i = 0; i < startButtons; i++) 
  {
    startButtons[i].addEventListener("click", GoToExistingGameHandler);
  }
}

document.querySelector(".new-game").addEventListener("click", NewGameHandler);
SetupUserSaveFiles();

// document
//   .querySelectorAll(".delete-game")
//   .addEventListener("click", DeleteGameHandler);

// document
//   .querySelectorAll(".existing-game")
//   .addEventListener("click", GoToExistingGameHandler);
