async function getAllUser() {
  const token = localStorage.getItem("token");
  let response = await fetch("http://localhost:8080/admin/users", {
    // Adding method type
    method: "GET",
    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "X-Auth-Token": token,
    },
  });
  let data = await response.json();
  let tbody = document.getElementById("user-data");
  for (let i = 0; i < data.data.length; i++) {
    let rowData = data.data[i];
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    td1.innerText = i + 1;
    td2.innerText = rowData["name"];
    td3.innerText = rowData["email"];
    td4.innerText = "View";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
  }
}
getAllUser();
