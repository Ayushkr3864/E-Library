let display = 0;
let lrn = document.getElementById("moretxt");
lrn.style.display = "none";
function toggle() {
  btn = document.getElementById("btn");
  dots = document.getElementById("points");
  if (display == 0) {
    lrn.style.display = "inline";
    dots.style.display = "none";
    btn.innerHTML = "show less";
    display = 1;
  } else {
    lrn.style.display = "none";
    btn.innerHTML = "show more";
    dots.style.display = "inline";
    display = 0;
  }
}
let a = 0;
var menuBtn = document.querySelector("#menu");
var navbar = document.getElementById("navdiv");
var heading = document.querySelector(".welcome");
// x.style.display="none";
function menu() {
  if (a == 0) {
    navbar.style.display = "flex";
    heading.style.margin = "40vmax 0 0 0";
    menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    a = 1;
  } else {
    navbar.style.display = "none";
    heading.style.margin = "0 0 0 0";
    menuBtn.innerHTML = "menu";
    a = 0;
  }
}

const next = document.getElementById("my-button");
const card_wrapper = document.querySelectorAll(".card-wrapper");
let i = 0;

next.addEventListener("click", function () {
  card_wrapper[i].classList.remove("active");
  i = (i + 1) % card_wrapper.length;
  card_wrapper[i].classList.add("active");
});
