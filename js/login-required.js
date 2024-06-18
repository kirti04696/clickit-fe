let user = localStorage.getItem("user");
console.log(user);
if (!user) {
  alert("Login first");
  window.location.replace("http://127.0.0.1:5500");
}
