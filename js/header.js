// hamburger menu

  document.querySelector(".hamburger").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("myLinks").classList.toggle("active");
});