//
const productCardLists = document.querySelector(".productCardLists");
const BASE_URL = `http://localhost:8080`;
//
const menu = document.querySelector(".menu");
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}`);
  console.log(response.data);
  drawCards(response.data);
}
getData("tastycard");
//
///////////////
function drawCards(data) {
  productCardLists.innerHTML = "";
  data.forEach((element) => {
    const productCardElement = document.createElement("div");
    productCardElement.className = "product-card";
    /////
    const productImageElement = document.createElement("img");
    productImageElement.className = "product-image";
    productImageElement.src = element.imageUrl;
    //
    const productNameElement = document.createElement("h5");
    productNameElement.className = "product-name";
    productNameElement.innerText = element.name;
    //
    const productPriceElement = document.createElement("p");
    productPriceElement.className = "product-price";
    productPriceElement.innerText = `$ ${element.price}`;
    //
    const buttonElement = document.createElement("a");
    buttonElement.className = "details-button";
    buttonElement.href = `details.html?id=${element.id}`;
    buttonElement.innerText = "VIEW";
    //
    productCardElement.append(
      productImageElement,
      productNameElement,
      productPriceElement,
      buttonElement
    );
    productCardLists.append(productCardElement);
  });
}
////////////////////////
menu.addEventListener("click", function () {
  this.classList.contains("fa-bars")
    ? (this.classList = "fa-solid fa-xmark")
    : (this.classList = "fa-solid fa-bars");
});
