async function getAllProduct() {
  const token = localStorage.getItem("token");
  let response = await fetch("http://127.0.0.1:8080/product/", {
    // Adding method type
    method: "GET",
    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "X-Auth-Token": token,
    },
  });
  let data = await response.json();
  console.log(data);
  let tbody = document.getElementById("product-list");
  for (let i = 0; i < data.data.length; i++) {
    let rowData = data.data[i];
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");
    td1.innerText = i + 1;
    td2.innerText = rowData?.["productName"];
    td3.innerText = rowData.productCategory?.categoryName;
    td4.innerText =
      rowData.productDetail?.["Manufactured Date"] != undefined
        ? rowData.productDetail?.["Manufactured Date"]
        : "";
    td5.innerText = rowData.productDetail?.["Expiry Date"];

    td6.innerText = rowData.productDetail?.["Self Life"];
    td7.innerText = rowData.productDetail?.["Return Policy"];
    td8.innerText = rowData.productDetail?.["FSSAI Licence"];
    console.log(td8.innerHTML);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tbody.appendChild(tr);
  }
}
getAllProduct();
