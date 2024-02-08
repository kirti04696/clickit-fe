let user = localStorage.getItem("user");
console.log(user);
if (!user) {
  window.location.replace("http://127.0.0.1:5500");
}
