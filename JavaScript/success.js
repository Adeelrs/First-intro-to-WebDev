let num = localStorage.getItem("pass1");
let mes = localStorage.getItem("pass2");

let maskedCardNumber = num.slice(0, -4).replace(/[0-9]/g, "*") + num.slice(-4);
document.getElementById("maskedCardNumber").textContent = String("Card Number: "+maskedCardNumber);

alert(mes);