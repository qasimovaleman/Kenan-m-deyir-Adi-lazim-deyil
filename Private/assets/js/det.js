const id = new URLSearchParams(window.location.search).get("id");
const BASE_URL = "http://localhost:8000/product";
const details = document.querySelector(".details");

async function getData() {
  let res = await axios(`${BASE_URL}/${id}`);

  details.innerHTML = `
    
    <div class="det-image">
    <img src="${res.data.image}" alt="">
</div>
<div class="det-text">
    <p>${res.data.title}</p>
    <p> $ ${res.data.price}</p>
    <p>${res.data.desc}</p>
    <button class="subs-btn" onclick=goBack()>Go Back</button>
</div>
    
    `;
}

getData();

function goBack() {
  window.history.back();
}
