function signup() {
  console.log("signup");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("pwd").value;
  let rpassword = document.getElementById("rpwd").value;
  fetch("http://localhost:8080/user/signup", {
    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((json) => {
      console.log(json);
      $("#signup-popup").modal("hide");
      alert("Account created successfully");
    });
}

function login() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-pwd").value;
  console.log(email + "----=--" + password);
  fetch("http://localhost:8080/user/login", {
    // Adding method type
    method: "POST",
    // Adding body or contents to send
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((json) => {
      console.log(json);
      $("#login-popup").modal("hide");
      alert("login successfully");
    });
}

async function login2() {
  let email_element = document.getElementById("login-email");
  let password_element = document.getElementById("login-pwd");
  let email = email_element.value;
  let password = password_element.value;
  if (email == "") {
    email_element.classList.add("error");
    return;
  } else {
    email_element.classList.remove("error");
  }
  if (password == "") {
    password_element.classList.add("error");
    return;
  } else {
    password_element.classList.remove("error");
  }
  let response = await fetch("http://localhost:8080/user/login", {
    // Adding method type
    method: "POST",
    // Adding body or contents to send
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (response.status == 200) {
    let data = await response.json();
    console.log(data);
    $("#login-popup").modal("hide");

    localStorage.setItem("token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));

    window.location.replace("http://127.0.0.1:5500/admin/dashboard.html");
  } else {
    console.log("something went wrong");
  }
}
