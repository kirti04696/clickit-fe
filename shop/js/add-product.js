// ingredients,keyfeature are not added yet in the form
async function addProduct(e) {
  e.preventDefault();
  console.log("===============");
  let productName = document.getElementById("productName").value;
  let productCategory = document.getElementById("productCategory").value;
  let selflife = document.getElementById("selflife").value;
  let manufactureDetail = document.getElementById("manufactureDetail").value;
  let fssai = document.getElementById("fssai").value;
  let returnPolicy = document.getElementById("returnPolicy").value;
  let marketedBy = document.getElementById("marketedBy").value;
  let expiry = document.getElementById("expiry").value;
  let mfd = document.getElementById("mfd").value;
  let Description = document.getElementById("Description").value;
  let Desclaimerr = document.getElementById("Desclaimerr").value;
  let Seller = document.getElementById("Seller").value;
  let Packaging = document.getElementById("Packaging").value;
  let customercare = document.getElementById("customercare").value;
  let unit = document.getElementById("unit").value;
  let price = document.getElementById("price").value;
  let productImage = document.getElementById("productImage");

  let fileData = productImage.files[0];
  let base64Data = "";
  if (fileData) {
    let reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = async () => {
      let response = await fetch("http://localhost:8080/product/add-product", {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
          productName: productName,
          productVarieties: [
            {
              unit: unit,
              price: price,
              images: [
                {
                  imageUrl: reader.result.toString(),
                },
              ],
            },
          ],
          productCategory: {
            categoryName: productCategory,
          },
          productDetail: {
            "Self Life": selflife,
            "Manufacturor Details": manufactureDetail,
            "Marketed By": marketedBy,
            "FSSAI Licence": fssai,
            "Customer Care Details": customercare,
            "Return Policy": returnPolicy,
            productDescription: Description,
            Desclaimer: Desclaimerr,
            "Expiry Date": expiry,
            "Manufactured Date": mfd,
          },
        }),
        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      let data = await response.json();
      console.log(data);
    };
  }
}
