let cartContainer = document.getElementById("productsList")
let totalContainer = document.getElementById("totalPrice")

let cartHTML = ""

let cartArray = JSON.parse(localStorage?.getItem("cartItems"))

if (cartArray){
  cartArray.forEach(product => {
    cartHTML += `
    <div>${product.productName}</div>
    <div>${product.cost}</div>
    <div>1</div>
    <div class="subtotal">${product.cost*1}</div>
    <div><img id=${product.id} class="binIcon" src="./sources/images/bin.png" alt="bin"/></div>
    `
  }); 
} else {
  cartHTML += `
  <div class="emptyCart">Carrito vacío</div>
  `
}

cartContainer.innerHTML = cartHTML

let subtotals = document.getElementsByClassName("subtotal")
let subTotal = 0
for (let i = 0; i < subtotals.length; i++) {
  subTotal += Number(subtotals[i].innerText)
}

let igv = (18*subTotal)/100
let total = subTotal+igv

totalContainer.innerHTML = `
<div class="one">Total de la compra</div>
<div class="two">Subtotal</div>
<div class="three">${subTotal}</div>
<div class="four">IGV</div>
<div class="five">${igv}</div>
<div class="six">Total</div>
<div class="seven">${total}</div>
<div class="totalBottons">
  <button class="buttonCancel">Cancelar compra</button>
  <button class="buttonPrintTicket">Emitir boleta</button>
</div>
`


document.addEventListener("click", (event) => {
  if (event.target && event.target.className === "binIcon") {
    cartArray = cartArray.filter(product => product.id != event.target.id)
    let cartJSON = JSON.stringify(cartArray)
    localStorage.setItem("cartItems", cartJSON)
    alert("Debe refrescar la página para ver los resultados.")
  }
  if (event.target && event.target.className === "buttonPrintTicket") {
    alert("Imprimiendo boleta")
  }
  if (event.target && event.target.className === "buttonCancel") {
    localStorage.clear()
    alert("Debe refrescar la página para ver los resultados.")
  }
})