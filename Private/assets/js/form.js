const tbody = document.querySelector("tbody");
const BASE_URL = "http://localhost:8000/product";
const form = document.querySelector("form");
const allInput = document.querySelectorAll("input");
const search = document.querySelector(".search");
const sort = document.querySelector(".sort");
const favCount = document.querySelector(".fav-count");
const goback = document.querySelector(".goback");

let favori = getFavFromStroge();
calculate(favori.length);

let array = null;
let arrayCopy = null;
async function getData() {
  let res = await axios(`${BASE_URL}`);
  array = res.data;
  arrayCopy = structuredClone(array);
  drawTable(res.data);
}
getData();

function drawTable(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${element.id}</td>
        <td>
        <img src="${element.image}" alt="">
        
        </td>
        <td>${element.title}</td>
        <td>${element.price}</td>
        <td>${element.desc}</td>
        <td>
        <button class="btn btn-success" onclick=editBtn(${element.id},this)>Edit</button>
        <button class="btn btn-danger" onclick=deleteBtn(${element.id},this)>Delete</button>
        
        </td>
        
        
        `;

    tbody.append(tr);
  });
}
let editId = false;

async function editBtn(id, btn) {
  editId = id;
  const BASE_URL = "http://localhost:8000/product";
  let res = await axios(`${BASE_URL}/${id}`);
  allInput[0].value = res.data.image;
  allInput[1].value = res.data.title;
  allInput[2].value = res.data.price;
  allInput[3].value = res.data.desc;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
    image: allInput[0].value,
    title: allInput[1].value,
    price: allInput[2].value,
    desc: allInput[3].value,
  };
  if (!editId) {
    if (
      allInput[0].value !== "" &&
      allInput[1].value !== "" &&
      allInput[2].value !== "" &&
      allInput[3].value !== ""
    ) {
      axios.post(`${BASE_URL}`, obj);
    }
  } else {
    axios.patch(`${BASE_URL}/${editId}`, obj);
  }
});

async function deleteBtn(id, btn) {
  if (confirm("silmeye eminsen")) {
    await axios.delete(`${BASE_URL}/${id}`);
  }
  btn.closest("tr").remove();
  favori = favori.filter((item) => item.id !== id);
  setFavFromStroge(favori);
  calculate(favori.length);
}

search.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered = array.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});

sort.addEventListener("click", function () {
  let sorted;

  if (this.innerText === "Ascending") {
    this.innerText = "Descending";
    sorted = array.sort((a, b) => a.title.localeCompare(b.title));
  } else if (this.innerText === "Descending") {
    this.innerText = "Default";
    sorted = array.sort((a, b) => b.title.localeCompare(a.title));
  } else {
    this.innerText = "Ascending";

    sorted = arrayCopy;
  }
  drawTable(sorted);
});

function setFavFromStroge(favs) {
  localStorage.setItem("favs", JSON.stringify(favs));
}

function getFavFromStroge() {
  return JSON.parse(localStorage.getItem("favs")) ?? [];
}

function calculate(count) {
  favCount.textContent = count;
}

goback.addEventListener("click", function () {
  window.history.back();
});
