const getCityHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const cityId = event.target.getAttribute("data-id");

    const response = await fetch(`/api/cities/${cityId}`, {
      method: "GET",
    });

    //route to fill out
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to load the city!");
    }
  }
};

document.querySelector(".cities").addEventListener("click", getCityHandler);
