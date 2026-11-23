// Back button: go to the previous page.
// If there is no previous page (the visitor opened this page directly),
// go to the home page instead.
var backButton = document.querySelector(".back-button");

backButton.addEventListener("click", function () {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = "index.html";
  }
});
