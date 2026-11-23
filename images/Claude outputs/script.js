// Click-and-drag to move the map around.
// This script is only used on map-directory.html

var map = document.querySelector(".map-viewport");

// Start with the map scrolled to the same spot as the Figma design
map.scrollLeft = 296;
map.scrollTop = 499;

var isDragging = false;
var didDrag = false;
var startX = 0;
var startY = 0;
var startScrollLeft = 0;
var startScrollTop = 0;

// Mouse button goes down on the map: remember where we started
map.addEventListener("mousedown", function (event) {
  isDragging = true;
  didDrag = false;
  startX = event.clientX;
  startY = event.clientY;
  startScrollLeft = map.scrollLeft;
  startScrollTop = map.scrollTop;
  map.classList.add("map-dragging");
  event.preventDefault();
});

// Mouse moves while the button is down: scroll the map the opposite way
window.addEventListener("mousemove", function (event) {
  if (isDragging == false) {
    return;
  }
  var moveX = event.clientX - startX;
  var moveY = event.clientY - startY;
  if (Math.abs(moveX) > 5 || Math.abs(moveY) > 5) {
    didDrag = true;
  }
  map.scrollLeft = startScrollLeft - moveX;
  map.scrollTop = startScrollTop - moveY;
});

// Mouse button comes up: stop dragging
window.addEventListener("mouseup", function () {
  isDragging = false;
  map.classList.remove("map-dragging");
});

// Clicking the map zooms in. Clicking again zooms back out.
// If you were dragging, or you clicked a place name, do nothing here.
var canvas = document.querySelector(".map-canvas");

map.addEventListener("click", function (event) {
  if (didDrag) {
    event.preventDefault();
    return;
  }
  if (event.target.closest("a")) {
    return;
  }

  // Where you clicked inside the map window, and which spot of the map that is
  var rect = map.getBoundingClientRect();
  var clickX = event.clientX - rect.left;
  var clickY = event.clientY - rect.top;
  var mapX = map.scrollLeft + clickX;
  var mapY = map.scrollTop + clickY;

  // Zoom in or out by adding or removing the class map-zoomed
  var widthBefore = canvas.offsetWidth;
  map.classList.toggle("map-zoomed");
  var growth = canvas.offsetWidth / widthBefore;

  // Scroll so the spot you clicked stays under your mouse
  map.scrollLeft = mapX * growth - clickX;
  map.scrollTop = mapY * growth - clickY;
});
