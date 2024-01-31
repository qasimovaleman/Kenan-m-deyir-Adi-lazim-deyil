const product = document.querySelector(".product");
const favCount = document.querySelector(".fav-count");

let favori = getFavFromStroge();
calculate(favori.length);

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
         <i class= "fa-solid fa-heart" onclick=favIcon(${element.id},this)></i>
 
  
         <a href="details.html?id=${element.id}"><i class="fa-brands fa-readme"></i></a>
  
     </div>
     </div>
          
          
          `;
  });
}
drawCard(favori);

function setFavFromStroge(favs) {
  localStorage.setItem("favs", JSON.stringify(favs));
}

function getFavFromStroge() {
  return JSON.parse(localStorage.getItem("favs")) ?? [];
}

function calculate(count) {
  favCount.textContent = count;
}

function favIcon(id, btn) {
  favori = favori.filter((item) => item.id !== id);
  btn.closest(".product-cards").remove();
  setFavFromStroge(favori);
  calculate(favori.length);
}
