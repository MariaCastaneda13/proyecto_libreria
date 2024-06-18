const socket=io();
console.log("Welcome to the Galactic Bookshelf");


socket.on("products", (data) => {
  console.log("Products", data);

  if (data.length > 0) {
    showProducts(data);
  }
});

function showProducts(products) {
  const tbody = document.querySelector("tbody");

  tbody.innerHTML = "";

  products.forEach((product) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.innerText = product.id;

    const tdTitle = document.createElement("td");
    tdTitle.innerText = product.title;

    const tdDescription = document.createElement("td");
    tdDescription.innerText = product.tdDescription;

    const tdPhoto = document.createElement("td");
    tdPhoto.innerText = product.tdPhoto;

    const tdPrice = document.createElement("td");
    tdPrice.innerText = product.price;

    const tdCode = document.createElement("td");
    tdCode.innerText = product.code;

    const tdStock = document.createElement("td");
    tdStock.innerText = product.stock;

    tr.appendChild(tdId);
    tr.appendChild(tdTitle);
    tr.appendChild(tdDescription);
    tr.appendChild(tdPhoto);
    tr.appendChild(tdPrice);
    tr.appendChild(tdCode);
    tr.appendChild(tdStock);

    tbody.appendChild(tr);
  });
}