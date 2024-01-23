const tBody = document.querySelector("tbody");
const form = document.querySelector("form");
const allInputs = document.querySelectorAll("input");
const BASE_URL = `http://localhost:8080`;
//
let editId = null;
const search = document.querySelector(".search");
const sort = document.querySelector(".sort");
///
let arr;
//
let products = null;
let productsCoppy = null;
async function getData(endPoint) {
  const response = await axios(`${BASE_URL}/${endPoint}`);
  console.log(response.data);
  drawTable(response.data);
  /////
  arr = response.data;
  /////
  products = response.data;
  productsCoppy = structuredClone(products);
}
getData("tastycard");
//////////
function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
    <td>${element.id}</td>
    <td> <img src="${element.imageUrl}" alt="" class="product-image"> </td>
    <td>${element.name}</td>
    <td>${element.description}</td>
    <td>${element.price}</td>
    <td> <button onclick=editBtn("${element.id}")> EDIT</button> </td>
    <td> <button onclick=deleteProduct("${element.id}",this)>DELETE</button> </td>
    `;
    tBody.append(trElement);
  });
}
///////////
function deleteProduct(id, btn) {
  if (window.confirm("do you want to delete product?"))
    axios.delete(`${BASE_URL}/tastycard/${id}`);
  btn.closest(".product-card");
}
/////////////////////////////////
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    imageUrl: `./assets/images/${allInputs[0].value.split("\\")[2]}`,
    name: allInputs[1].value,
    description: allInputs[2].value,
    price: allInputs[3].value,
  };
  //
  if (!editId) {
    if (
      allInputs[0].value != "" &&
      allInputs[1].value != "" &&
      allInputs[2].value != "" &&
      allInputs[3].value != ""
    ) {
      await axios.post(`${BASE_URL}/tastycard`, obj);
    } else {
      alert("Bow buraxmaq olmaz!!");
    }
  } else {
    await axios.patch(`${BASE_URL}/tastycard/${editId}`, obj);
  }
  //
});
////
async function editBtn(id) {
  editId = id;
  const response = await axios(`${BASE_URL}/tastycard/${id}`);
  allInputs[1].value = response.data.name;
  allInputs[2].value = response.data.description;
  allInputs[3].value = response.data.price;
}
/////////////////////////
search.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered;
  filtered = arr.filter((item) =>
    item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  console.log(filtered);
  drawTable(filtered);
});
/////////////////////////////////
sort.addEventListener("click", function () {
  let sorted;
  if (this.innerText == "Ascending") {
    sorted = products.sort((a, b) => a.name.localeCompare(b.name));
    this.innerText = "Descending";
  } else if (this.innerText == "Descending") {
    sorted = products.sort((a, b) => b.name.localeCompare(a.name));
    this.innerText = "Default";
  } else {
    this.innerText = "Ascending";
    sorted = productsCoppy;
  }
  drawTable(sorted);
});
menu.addEventListener("click",function(){
  this.classList.contains("fa-bars")
  ? (this.classList="fa-solid fa-xmark")
  : (this.classList="fa-solid fa-bars")
})

