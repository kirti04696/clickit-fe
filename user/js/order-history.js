async function getUserOrderHistory() {
  const token = localStorage.getItem("token");
  let userId = JSON.parse(localStorage.getItem("user")).userId;
  let response = await fetch(
    "http://localhost:8080/order/get-orders/" + userId,
    {
      // Adding method type
      method: "GET",
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        token: token,
      },
    }
  );
  let data = await response.json();
  data = data.data;
  const tbody = document.getElementById("order-body");
  tbody.innerHTML = "";
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");

    td1.innerHTML = data[i].address;
    td2.innerHTML = data[i].orderDate.substring(0, 10);
    td3.innerHTML = data[i].paymentMode;
    td4.innerHTML = data[i].amount;
    td5.innerHTML = "Ready to Ship";

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tbody.appendChild(tr);
    console.log(data[i]);
  }
}
