async function getAllShop() {
  const token = localStorage.getItem("token");
  let response = await fetch("http://127.0.0.1:8080/admin/shops", {
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
  let tbody = document.getElementById("shop-data");
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
    td1.innerText = i + 1;
    td2.innerText = rowData["shopName"];
    td3.innerText = rowData.shopOwner.email;
    td4.innerText = rowData["gstnumber"];
    td5.innerText =
      "Area - " +
      rowData.shopAddress.area +
      " " +
      "Shop - " +
      rowData.shopAddress.shopNo +
      " " +
      "street no - " +
      rowData.shopAddress.streetNo +
      " " +
      "pin - " +
      rowData.shopAddress.pincode;
    td6.innerText = rowData["shopStatus"];

    td7.appendChild(getIcon("view"));
    let del = getIcon("delete", "red");
    del.setAttribute("onclick", "deleteShop(" + rowData.shopId + ")");
    td7.appendChild(del);
    let toggleIcon;
    if (rowData.shopStatus == "ACTIVE") {
      toggleIcon = getIcon("lock", "green");
      toggleIcon.setAttribute(
        "onclick",
        "activateShop(" + rowData.shopId + ",'DECLINE')"
      );
    } else {
      toggleIcon = getIcon("lock", "red");
      toggleIcon.setAttribute(
        "onclick",
        "activateShop(" + rowData.shopId + ",'ACTIVE')"
      );
    }
    td7.appendChild(toggleIcon);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tbody.appendChild(tr);
  }
}

const icons = {
  lock: "bi-ban-fill",
  view: "bi-eye-fill",
  delete: "bi-trash-fill",
};

function getIcon(icon_name, color = "black") {
  let icon = document.createElement("i");
  icon.classList.add("bi");
  icon.classList.add(icons[icon_name]);
  if (color != "black") {
    icon.classList.add("icon_" + color);
  }
  return icon;
}

async function activateShop(shopId, status) {
  const token = localStorage.getItem("token");
  let response = await fetch(
    "http://127.0.0.1:8080/admin/shop/" + shopId + "?status=" + status,
    {
      // Adding method type
      method: "PUT",
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Auth-Token": token,
      },
    }
  );
  let data = await response.json();
  console.log(data);
  location.reload();
}

async function deleteShop(shopId) {
  const token = localStorage.getItem("token");
  let response = await fetch("http://127.0.0.1:8080/admin/shop/" + shopId, {
    // Adding method type
    method: "DELETE",
    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "X-Auth-Token": token,
    },
  });
  let data = await response.json();
  console.log(data);
  location.reload();
}
getAllShop();
