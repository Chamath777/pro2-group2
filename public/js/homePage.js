function goToHomePageHandler() {
  document.location.replace("/saveFile");
}

document
  .querySelector("#homepage")
  .addEventListener("click", goToHomePageHandler);
