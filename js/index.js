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
    console.log("---------------------------------------");
    console.log(data);
    $("#login-popup").modal("hide");
    localStorage.clear();

    localStorage.setItem("token", data.data.tokenData.token);
    localStorage.setItem("user", JSON.stringify(data.data.tokenData.user));

    if (data.data.tokenData.user.userType == "ADMIN") {
      window.location.replace("http://127.0.0.1:5500/admin/dashboard.html");
    } else if (data.data.tokenData.user.userType == "USER") {
      window.location.replace("http://127.0.0.1:5500/user/dashboard.html");
    } else {
      localStorage.setItem("shop", JSON.stringify(data.data.shopData));
      window.location.replace("http://127.0.0.1:5500/shop/dashboard.html");
    }
  } else {
    console.log("something went wrong");
  }
}

function createProductElement(data) {
  // let data = {
  //   productId: 1,
  //   productName: "Rice",
  //   productVarieties: [
  //     {
  //       productVarietyId: 1,
  //       unit: 1,
  //       price: 500,
  //       images: [
  //         {
  //           productImgId: 1,
  //           imageUrl:
  //             "supermarket-food-gift-baskets-grocery-store-shopping-cart-fresh-food-picnic-baskets-hamper-ketogenic-diet-png-clipart.jpg",
  //         },
  //       ],
  //     },
  //   ],
  // };

  let image = document.createElement("img");

  let title = document.createElement("h5");
  let price = document.createElement("p");
  let addcartBtn = document.createElement("a");
  let carBody = document.createElement("div");
  let card = document.createElement("div");

  image.classList.add("card-img-top");
  image.setAttribute(
    "src",
    "supermarket-food-gift-baskets-grocery-store-shopping-cart-fresh-food-picnic-baskets-hamper-ketogenic-diet-png-clipart.jpg"
  );

  title.classList.add("card-title");
  title.innerHTML = data.productName;

  price.classList.add("card-text");
  price.innerHTML = data.productVarieties[0].price;

  addcartBtn.classList.add("btn");
  addcartBtn.classList.add("btn-primary");
  addcartBtn.setAttribute("href", "###");
  addcartBtn.innerHTML = "Add to cart";

  carBody.classList.add("card-body");

  card.classList.add("card");
  card.classList.add("m-4");
  card.setAttribute("style", "width: 15rem");

  carBody.appendChild(title);
  carBody.appendChild(price);
  carBody.appendChild(addcartBtn);

  card.appendChild(image);
  card.appendChild(carBody);
  return card;
}

async function loadProductData() {
  let response = await fetch("http://localhost:8080/product/");
  let productData = await response.json();
  let product = document.getElementById("product-container");
  for (let i = 0; i < productData.data.length; i++) {
    product.appendChild(createProductElement(productData.data[i]));
  }
}

// -----------------------product details.html-----------------------

async function loadProductDetailById(productId) {
  let response = await fetch("http://localhost:8080/product/" + productId);
  let productData = await response.json();
  let data = productData.data;
  console.log(data);
  document.getElementById("product-title").innerHTML = data.productName;
  document.getElementById("discription").innerHTML =
    data.productDetail.productDescription;
  document.getElementById("price").innerHTML =
    "Price &#x20B9;" + data.productVarieties[0].price;
  document
    .getElementById("product-img")
    .setAttribute("src", data.productVarieties[0].images[0].imageUrl);

  let descriptionTag = document.getElementById("product-details");

  for (const [key, value] of Object.entries(data.productDetail)) {
    if (key == "productDetailsId" || key == "productDescription") {
      continue;
    }
    if (value != null) {
      let h5 = document.createElement("h5");
      h5.innerHTML = key;
      let content = document.createElement("p");
      content.innerHTML = value;

      descriptionTag.appendChild(h5);
      descriptionTag.appendChild(content);
    }
  }
}
