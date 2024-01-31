const BASE_URL = "http://localhost:8000/product";
const product = document.querySelector(".product");
const loadmore = document.querySelector(".load");
const favCount = document.querySelector(".fav-count");
const basketCount = document.querySelector(".basket-count");
let favori = getFavFromStroge();
let basket = getBasketFromStroge();
calculate(favori.length);
calculateBasket();
let limit = 3;
let array = null;
async function getData() {
  let res = await axios(`${BASE_URL}`);
  console.log(res.data);
  array = res.data;
  drawCard(res.data.slice(0, limit));
}
getData();

function drawCard(data) {
  product.innerHTML = "";
  data.forEach((element) => {
    product.innerHTML += `
        <div class="product-cards">
        <div class="p-image">
       <img src="${element.image}" alt="">
   </div>
   <div class="p-text">
       <h5>${element.title}</h5>
       <p>${element.desc}</p>
       <i class="${
         favori.some((item) => item.id === element.id)
           ? "fa-solid fa-heart"
           : "fa-regular fa-heart"
       }" onclick=favIcon(${element.id},this)></i>
       <i class="fa-solid fa-cart-shopping" onclick=basketIcon(${
         element.id
       },this)></i>

       <a class="details" href="details.html?id=${
         element.id
       }"><i class="fa-brands fa-readme"></i></a>

   </div>
   </div>
        
        
        `;
  });
}

function favIcon(id, icon) {
  if (icon.className === "fa-regular fa-heart") {
    icon.className = "fa-solid fa-heart";
  } else {
    icon.className = "fa-regular fa-heart";
  }

  let favs = getFavFromStroge();
  let bool = favs.find((item) => item.id === id);
  let favProduct = array.find((item) => item.id === id);

  if (bool) {
    favs = favs.filter((item) => item.id !== id);
  } else {
    favs.push(favProduct);
  }

  setFavFromStroge(favs);
  calculate(favs.length);
}

loadmore.addEventListener("click", function () {
  limit += 3;
  if (limit >= array.length) {
    this.remove();
  }
  drawCard(array.slice(0, limit));
});

function basketIcon(id, btn) {
  let basketProduct = array.find((item) => item.id === id);
  let index = basket.findIndex((item) => item.id === id);
  if (index > -1) {
    basket[index].count += 1;
  } else {
    basket.push({ count: 1, ...basketProduct });
  }
  console.log(basket);
  setBasketFromStroge(basket);
  calculateBasket(basket.length);
}

function setFavFromStroge(favs) {
  localStorage.setItem("favs", JSON.stringify(favs));
}

function getFavFromStroge() {
  return JSON.parse(localStorage.getItem("favs")) ?? [];
}
function setBasketFromStroge(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasketFromStroge() {
  return JSON.parse(localStorage.getItem("basket")) ?? [];
}

function calculate(count) {
  favCount.textContent = count;
}

function calculateBasket() {
  basketCount.textContent = basket.reduce((acc, curr) => acc + curr.count, 0);
}
