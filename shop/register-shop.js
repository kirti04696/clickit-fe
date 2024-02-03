async function registerShop(e) {
  e.preventDefault();

  let shopName = document.getElementById("shopName").value;
  let gstnumber = document.getElementById("gstno").value;
  let shopNumber = document.getElementById("shopNumber").value;
  let streetNumber = document.getElementById("streetNumber").value;
  let area = document.getElementById("area").value;
  let state = document.getElementById("state").value;
  let country = document.getElementById("country").value;
  let pincode = document.getElementById("pincode").value;
  let email = document.getElementById("email").value;
  let shopOwnerName = document.getElementById("shopOwnerName").value;
  let accountHolderName = document.getElementById("accountHoldername").value;
  let accountnumber = document.getElementById("accountnumber").value;
  let bankName = document.getElementById("bankName").value;
  let ifscNumber = document.getElementById("ifscNumber").value;

  let response = await fetch("http://localhost:8080/shop/register", {
    // Adding method type
    method: "POST",
    // Adding body or contents to send
    body: JSON.stringify({
      shopName: shopName,
      gstnumber: gstnumber,
      shopAddress: {
        shopNo: shopNumber,
        streetNo: streetNumber,
        area: area,
        state: state,
        country: country,
        pincode: pincode,
      },
      shopOwner: {
        name: shopOwnerName,
        email: email,
        password: "1234",
      },
      bankAccount: {
        accountHolderName: accountHolderName,
        bankName: bankName,
        accountNumber: accountnumber,
        ifscCode: ifscNumber,
      },
    }),
    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  let data = await response.json();
  console.log(data);
}
