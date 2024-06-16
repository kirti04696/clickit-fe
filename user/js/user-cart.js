async function getUserCartItems() {
  const token = localStorage.getItem("token");
  let response = await fetch("http://localhost:8080/user/cart-items", {
    // Adding method type
    method: "GET",
    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      token: token,
    },
  });
  let data = await response.json();
  data = data.data;
  const tbody = document.getElementById("cart-body");
  tbody.innerHTML = "";
  console.log(data);
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let btna = document.createElement("a");

    td1.setAttribute("onclick", "deleteCartItem(" + data[i].cartId + ")");
    td1.innerHTML = "&#10060;";
    td2.innerHTML = data[i].product.productName;
    td3.innerHTML = data[i].variety.unit;
    td4.innerHTML = data[i].variety.price;
    td5.innerHTML = data[i].quantity;
    td6.innerHTML = data[i].variety.price * data[i].quantity;
    total += data[i].variety.price * data[i].quantity;

    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td1);

    tbody.appendChild(tr);
    console.log(data[i]);
  }
  document.getElementById("total-amount").innerHTML = total;
}

async function deleteCartItem(cartId) {
  const token = localStorage.getItem("token");
  let response = await fetch("http://localhost:8080/user/cart-item/" + cartId, {
    // Adding method type
    method: "DELETE",
    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      token: token,
    },
  });
  let data = await response.json();
  console.log(data);
  getUserCartItems();
}
