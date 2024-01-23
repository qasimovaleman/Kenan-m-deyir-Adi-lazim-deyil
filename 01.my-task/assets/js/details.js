const details = document.querySelector(".details");
////
const BASE_URL = `http://localhost:8080`;
//
let id = new URLSearchParams(window.location.search).get("id");
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}/${id}`);
  console.log(response.data);
  drawCard(response.data);
}
getData("tastycard");
//
///////////////
function drawCard(element) {
  details.innerHTML = "";
  details.innerHTML = `
  <div class="product-card">
  <img src="${element.imageUrl}" alt="" class="product-image"/>
  <h5 class="product-name">${element.name}</h5>
  <p class="product-price">${element.price}</p>
  <p class="product-description">${element.description}</p>
</div>
  `;
}
