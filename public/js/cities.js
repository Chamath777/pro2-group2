const buyItemHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const itemId = event.target.getAttribute("data-id");

    //route to fill out
    const response = await fetch(`/${itemId}`, {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //route to fill out
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

const sellItemHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const itemId = event.target.getAttribute("data-id");

    //route to fill out
    const response = await fetch(`/${itemId}`, {
      method: "DELETE",
    });

    //route to fill out
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector(".buy-item").addEventListener("click", buyItemHandler);

document.querySelector(".sell-item").addEventListener("click", sellItemHandler);
