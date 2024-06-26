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
  console.log(data);
  let image = document.createElement("img");

  let title = document.createElement("h5");
  let price = document.createElement("p");
  let addcartBtn = document.createElement("a");
  let carBody = document.createElement("div");
  let card = document.createElement("div");

  image.classList.add("card-img-top");
  image.setAttribute("src", data?.productVarieties[0]?.images[0]?.imageUrl);
  console.log(data);

  title.classList.add("card-title");
  title.innerHTML = data.productName;

  price.classList.add("card-text");
  price.innerHTML = data.productVarieties[0].price;

  addcartBtn.classList.add("btn");
  addcartBtn.classList.add("btn-primary");
  addcartBtn.setAttribute("href", "product-detail.html?id=" + data.productId);
  addcartBtn.innerHTML = "View product";

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
