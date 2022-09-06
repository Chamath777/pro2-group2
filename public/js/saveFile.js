// handler creating a new game/saveFile/character
const newGameHandler = async (event) => {
  event.preventDefault();

  //querying form with field for name of new character/new game
  const newGame = document.querySelector("#new-game").value.trim();

  if (newGame) {
    //route to fill out
    const response = await fetch(`/api/`, {
      method: "POST",
      body: JSON.stringify({ newGame }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //route to fill out
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create new game!");
    }
  }
};

//deleting a game/saveFile/character
const deleteGameHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const gameId = event.target.getAttribute("data-id");

    const response = await fetch(`/api/games/${gameId}`, {
      method: "DELETE",
    });

    //route to fill out
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to delete game");
    }
  }
};

document.querySelector(".new-game").addEventListener("submit", newGameHandler);

document.querySelector(".game-list").addEventListener("click", deleteGameHandler);
