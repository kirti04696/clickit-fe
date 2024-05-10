const logeduser = JSON.parse(localStorage.getItem("user"));
console.log(logeduser.name);
document.getElementById("user-name").innerHTML = logeduser.name;
if (logeduser.userType === "SHOP_OWNER") {
  const logedShop = JSON.parse(localStorage.getItem("shop"));
  document.getElementById("shop-name").innerHTML = logedShop.shopName;
}

function logout() {
  localStorage.clear();
  window.location.replace("http://127.0.0.1:5500");
}
