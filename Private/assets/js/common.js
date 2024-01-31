const nav = document.querySelector(".h-nav");
const header = document.querySelector("header");
const menu = document.querySelector("#menu");
const moon = document.querySelector(".fa-moon");
const totop = document.querySelector(".to-top");
const body = document.querySelector("body");
window.addEventListener("scroll", function () {
  if (scrollY > 0) {
    header.classList.add("header-scroll");
    totop?.classList.add("active");
  } else {
    header.classList.remove("header-scroll");
    totop?.classList.remove("active");
  }
});

menu.addEventListener("click", function () {
  nav.classList.toggle("show");
  this.classList.contains("fa-bars")
    ? (this.classList = "fa-solid fa-bars")
    : (this.classList = "fa-solid fa-xmark");
});

localStorage.getItem("dark-mode") === "true" && body.classList.add("dark-mode");
moon?.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
  console.log("fgsdf");
  localStorage.getItem("dark-mode") === "true"
    ? localStorage.setItem("dark-mode", false)
    : localStorage.setItem("dark-mode", true);
});
