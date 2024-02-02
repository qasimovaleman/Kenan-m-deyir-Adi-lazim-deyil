let BASE_URL = "http://localhost:8080/menu";
let menuCardLists = document.querySelector(".menu-card-lists");
let menuAllData = null;

async function getALLData() {
  let res = await axios(`${BASE_URL}`);
  // console.log(res.data);
  menuAllData = res.data;

  let filtered = menuAllData.filter(
    (item) => item.caregory.toLocaleLowerCase() === "main"
  );
  drawCards(filtered);
}
getALLData();
let favorites = getFromlocalStorage();
function drawCards(array) {
  menuCardLists.innerHTML = "";
  array.forEach((el) => {
    let find = favorites.find((item) => item.id == el.id);

    menuCardLists.innerHTML += `
        <div class="menu-card">
              <div class="img">
                <img src="${el.image}" alt="" />
              </div>
              <div class="menu-text">
                <h5>${el.title}</h5>
                <p>${el.desc}</p>
                <i class="${
                  find ? "fa-solid fa-heart" : "fa-regular fa-heart"
                }" onclick=favs(this,"${el.id}")></i>
             <a href='details.html?id=${
               el.id
             }'> details</a><i class="fa-solid fa-cart-shopping" onclick=cart("${
      el.id
    }")></i> 
                </div> 
              <h4>$${el.price}</h4>
             
              
              
            </div>
        `;
  });
}

menuBtnAll = document.querySelectorAll(".menu-btn");
menuBtnAll.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".active-btn").classList.remove("active-btn");
    this.classList.add("active-btn");
    let filtered = menuAllData.filter(
      (item) =>
        item.caregory.toLocaleLowerCase() === this.innerText.toLocaleLowerCase()
    );
    drawCards(filtered);
  })
);
function favs(icon, id) {
  if (icon.className === "fa-regular fa-heart") {
    icon.className = "fa-solid fa-heart";
    let find = menuAllData.find((item) => item.id == id);
    favorites.push(find);
  } else {
    icon.className = "fa-regular fa-heart";
    favorites = favorites.filter((item) => item.id != id);
  }
  setTolocalStorage(favorites);
}
function setTolocalStorage(array) {
  localStorage.setItem("favorites", JSON.stringify(array));
}
function getFromlocalStorage() {
  return JSON.parse(localStorage.getItem("favorites")) ?? [];
}
let header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("header-scroll", this.window.scrollY > 0);
});
let nav = document.querySelector("nav");
let menuIcon = document.querySelector(".fa-bars");
menuIcon.addEventListener("click", function () {
  nav.classList.toggle("show");
  if (menuIcon.classList.contains("fa-bars")) {
    menuIcon.className = "fa-solid fa-xmark";
  } else {
    menuIcon.className = "fa-solid fa-bars";
  }
});

allLiElem = document.querySelectorAll("li");
allLiElem.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".active").classList.remove("active");
    this.classList.add("active");
  })
);

let basket = getFromlocalStorageBasket();

function cart(id) {
  console.log(id);
  let find = menuAllData.find((item) => item.id == id);
  let index = basket.findIndex((item) => item.obj.id === id);
  if (index === -1) {
    basket.push({ count: 1, obj: find });
  } else {
    basket[index].count += 1;
  }

  setTolocalStorageBasket(basket);
}

function setTolocalStorageBasket(array) {
  localStorage.setItem("basket", JSON.stringify(array));
}
function getFromlocalStorageBasket() {
  return JSON.parse(localStorage.getItem("basket")) ?? [];
}
