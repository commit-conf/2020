var blocks = document.querySelectorAll(".random-entry");
for (var i = 0; i < blocks.length; i++) {
  blocks[i].classList.add("hidden");
}
var block = blocks[Math.floor(Math.random() * blocks.length)];
block.classList.remove("hidden");
